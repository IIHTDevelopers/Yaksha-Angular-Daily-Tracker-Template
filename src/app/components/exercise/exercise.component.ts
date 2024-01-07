import { Component } from '@angular/core';

interface Exercise {
  id: number;
  name: string;
  time: string;
  caloriesBurned: number;
}

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent {
  exercises: Exercise[] = [];
  newExercise: Exercise = {} as Exercise;
  editedExercise: Exercise = {} as Exercise;
  isEditing = false;
  searchKeyword = '';

  addExercise(): void {
  }

  editExercise(exercise: Exercise): void {
  }

  saveEditedExercise(): void {
  }

  cancelEdit(): void {
  }

  deleteExercise(exercise: Exercise): void {
  }

  get filteredExercises(): Exercise[] {
    return [];
  }
}

