import { faker } from '@faker-js/faker'
export default class Utility {
  getMaintenanceIssues() {
    const buildingMaintenanceProblems = [
      'Leaky roof',
      'Faulty electrical wiring',
      'Plumbing issues',
      'HVAC system malfunction',
      'Cracked foundation',
      'Pest infestation',
      'Sewage leakage',
    ]
    const randomIndex = Math.floor(Math.random() * buildingMaintenanceProblems.length)
    return buildingMaintenanceProblems[randomIndex]
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}
