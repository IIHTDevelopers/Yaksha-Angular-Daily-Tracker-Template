import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ExerciseComponent } from './exercise.component';

describe('ExerciseComponent', () => {
  let component: ExerciseComponent;
  let fixture: ComponentFixture<ExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExerciseComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have form fields for adding an exercise', () => {
      const compiled = fixture.nativeElement;
      const formFields = compiled.querySelectorAll('form input');
      expect(formFields.length).toBe(3); // Check for the number of input fields
    });

    it('should have a button for adding an exercise', () => {
      const compiled = fixture.nativeElement;
      const addButton = compiled.querySelector('form button[type="submit"]');
      expect(addButton.textContent).toContain('Add Exercise');
    });

    it('should display search input for filtering exercises', () => {
      const compiled = fixture.nativeElement;
      const searchInput = compiled.querySelector('div:nth-child(3) input[type="text"]');
      expect(searchInput).toBeTruthy();
    });

    it('should display edit exercise form when editing an exercise', () => {
      component.isEditing = true;
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      const editForm = compiled.querySelector('div:nth-child(5) form');
      expect(editForm).toBeTruthy();
      const saveButton = editForm.querySelector('button[type="submit"]');
      const cancelButton = editForm.querySelector('button[type="button"]');
      expect(saveButton.textContent).toContain('Save');
      expect(cancelButton.textContent).toContain('Cancel');
    });

    it('should add an exercise when submitting the add exercise form', () => {
      const addButton = fixture.nativeElement.querySelector('form button[type="submit"]');
      const inputFields = fixture.nativeElement.querySelectorAll('form input');
      const sampleExercise = {
        name: 'Running',
        time: '30',
        caloriesBurned: 300,
      };

      inputFields[0].value = sampleExercise.name;
      inputFields[0].dispatchEvent(new Event('input'));
      inputFields[1].value = sampleExercise.time;
      inputFields[1].dispatchEvent(new Event('input'));
      inputFields[2].value = sampleExercise.caloriesBurned;
      inputFields[2].dispatchEvent(new Event('input'));

      addButton.click();
      fixture.detectChanges();

      expect(component.exercises.length).toBe(1);
      expect(component.exercises[0]).toEqual({
        ...sampleExercise,
        id: 1,
      });
    });

    it('should have initial exercises array empty', () => {
      expect(component.exercises).not.toBeNull();
      expect(component.exercises).toEqual([]);
    });

    it('should add a new exercise', () => {
      component.newExercise = {
        id: 1,
        name: 'Swimming',
        time: '45',
        caloriesBurned: 400,
      };
      component.addExercise();
      expect(component.exercises).not.toBeNull();
      expect(component.exercises.length).toBe(1);
    });

    it('should not add an exercise with empty fields', () => {
      component.newExercise = {
        id: 0,
        name: '',
        time: '',
        caloriesBurned: 0,
      };
      component.addExercise();
      expect(component.exercises).not.toBeNull();
      expect(component.exercises.length).toBe(1);
    });

    it('should edit an exercise and update it', () => {
      component.newExercise = {
        id: 1,
        name: 'Swimming',
        time: '45',
        caloriesBurned: 400,
      };
      component.addExercise();

      component.editExercise(component.exercises[0]);
      const updatedExercise = {
        id: component.exercises[0].id,
        name: 'Cycling',
        time: '60',
        caloriesBurned: 500,
      };
      component.editedExercise = { ...updatedExercise };
      component.saveEditedExercise();
      expect(component.exercises).not.toBeNull();
      expect(component.exercises[0]).not.toBeNull();
      expect(component.exercises[0]).toEqual(updatedExercise);
    });

    it('should not edit an exercise with empty fields', () => {
      component.newExercise = {
        id: 1,
        name: 'Swimming',
        time: '45',
        caloriesBurned: 400,
      };
      component.addExercise();

      component.editExercise(component.exercises[0]);
      const originalExercise = { ...component.exercises[0] };
      component.newExercise = {
        id: originalExercise.id,
        name: '',
        time: '',
        caloriesBurned: 0,
      };
      component.saveEditedExercise();
      expect(component.exercises).not.toBeNull();
      expect(component.exercises[0]).not.toBeNull();
      expect(component.exercises[0]).toEqual(originalExercise);
    });

    it('should delete an exercise', () => {
      component.newExercise = {
        id: 1,
        name: 'Swimming',
        time: '45',
        caloriesBurned: 400,
      };
      component.addExercise();

      expect(component.exercises).not.toBeNull();
      expect(component.exercises.length).toBe(1);
      component.deleteExercise(component.exercises[0]);
      expect(component.exercises.length).toBe(0);
    });

    it('should cancel editing', () => {
      component.editExercise({
        id: 1,
        name: 'Swimming',
        time: '45',
        caloriesBurned: 400,
      });
      component.cancelEdit();
      expect(component.isEditing).toBe(false);
      expect(component.editedExercise).toEqual({});
    });

    it('should filter exercises based on search keyword', () => {
      component.newExercise = {
        id: 1,
        name: 'Swimming',
        time: '45',
        caloriesBurned: 400,
      };
      component.addExercise();

      component.searchKeyword = 'Swimming';
      expect(component.filteredExercises.length).toBe(1);

      component.searchKeyword = 'Running';
      expect(component.filteredExercises.length).toBe(0);
    });
  });
});
