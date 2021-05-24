import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'chuck-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'chuck-app';

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.loadIcons();
  }

  loadIcons(): void {
    const icons = ['plus_icon', 'minus_icon'];
    icons.forEach((icon) => {
      const fileName = icon.replace('_', '-');
      this.iconRegistry.addSvgIcon(
        icon,
        this.sanitizer.bypassSecurityTrustResourceUrl(
          `assets/icons/${fileName}.svg`
        )
      );
    });
  }
}
