import { Component } from '@angular/core';
import { TopMenu } from './components/top-menu/top-menu';
import { Navbar } from './components/navbar/navbar';
import { MainContent } from './components/main-content/main-content';
import { BottomFooter } from './components/bottom-footer/bottom-footer';

@Component({
  selector: 'landing-page',
  imports: [TopMenu, Navbar, MainContent, BottomFooter],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css'
})
export class LandingPage {

}
