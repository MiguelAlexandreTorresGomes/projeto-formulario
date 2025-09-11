import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSteps',
  standalone: true
})
export class FilterStepsPipe implements PipeTransform {
  transform(steps: any[]): any[] {
    return steps.filter(step => step.number <= 4);
  }
}