import { print } from './utils';

export class Resources {
  private resources: string[];

  constructor() {
    this.resources = [];
  }

  addResource(resource: string): void {
    const isStarted = StartResource(resource);
    if (isStarted) {
      this.resources.push(resource);
    } else {
      print.info('Refreshing resource: ', resource);

      ExecuteCommand('refresh');
      // TODO: this call is calling recursion, fix this
      // print.info('Adding resource: ', resource);
      this.addResource(resource);
    }
  }

  removeResource(resource: string): void {
    const index = this.resources.indexOf(resource);
    if (index > -1) {
      // only splice array when item is found
      StopResource(resource);
      this.resources.splice(index, 1); // 2nd parameter means remove one item only
    }
  }

  restartResource(resource: string): void {
    StopResource(resource);
    StartResource(resource);
  }
}
