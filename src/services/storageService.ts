import type { IExercise } from '@/types/exercise';

export class StorageService {
  private static instance: StorageService;

  private storageKey: string;

  private constructor() {
    this.storageKey = import.meta.env.VITE_STORAGE_KEY;
  }

  public static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  public getExercises(): IExercise[] {
    const exercises = localStorage.getItem(this.storageKey);
    if (!exercises) {
      return [];
    }
    return JSON.parse(exercises);
  }

  public setExercises(exercises: IExercise[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(exercises));
  }
}
