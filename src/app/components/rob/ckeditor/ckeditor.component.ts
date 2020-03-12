import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ckeditor',
  templateUrl: './ckeditor.component.html',
  styleUrls: ['./ckeditor.component.scss']
})
export class CkeditorComponent implements OnInit {
  public model = {
    name: '',
    editorData: '<p>Hello, world!</p>'
  };

  constructor() {}

  ngOnInit() {
  }

  printToPDF() {
    const editorData = encodeURIComponent(this.model.editorData);
    const nameData = encodeURIComponent(this.model.name);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://robandmindy.com/ckeditor/tcpdf.php', true);

    // Send the proper header information along with the request
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            // Request finished. Do processing here.
            window.open('http://robandmindy.com/ckeditor/example_001.pdf', '_blank');
            console.log('done');
        }
    };
    xhr.send('name=' + nameData + '&content=' + editorData);
  }

}
