import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Database, object, ref } from '@angular/fire/database';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  luminosidad: number = 0;
  isDay: boolean = true;

  constructor(private database: Database) {}
  ngOnInit() {
    this.accessFirebaseData();
  }

  accessFirebaseData() {
    const luzRoute = ref(this.database, "/sensor/luz");
    object(luzRoute).subscribe(async value => {
      this.luminosidad = value.snapshot.val();
      await this.notifyDayOrNight();
    });
  }


  async notifyDayOrNight() {
    const threshold = 50; // Define un umbral de luminosidad para distinguir día y noche
    if (this.luminosidad >= threshold && !this.isDay) {
      this.isDay = true;
      await this.sendLocalNotification("Buenos Días", "Su nivel de luz indica que esta de diá");
    } else if (this.luminosidad < threshold && this.isDay) {
      this.isDay = false;
      await this.sendLocalNotification("Buenas Noches", "Su nivel de luz indica que es de noche");
    }
  }

  async sendLocalNotification(title: string, body: string) {
    await LocalNotifications.requestPermissions();
    await LocalNotifications.schedule({
      notifications: [
        {
          title: title,
          body: body,
          id: new Date().getTime()
        }
      ]
    });
  }
}



