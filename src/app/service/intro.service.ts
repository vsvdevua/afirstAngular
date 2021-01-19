import {Injectable} from '@angular/core';
import * as introJs from 'intro.js/intro';

@Injectable({
  providedIn: 'root'
})
export class IntroService {
   static INTRO_VIEWED_KEY = 'intro-viewed';
   static INTRO_VIEWED_VALUE = 'done';
   introJS = introJs();

  constructor() {
  }
  startIntroJS(checkViewed: boolean): void{
    if (checkViewed === true && localStorage
      .getItem(IntroService.INTRO_VIEWED_KEY) === IntroService.INTRO_VIEWED_VALUE){
   return;
    }
    this.introJS.setOptions({
      nextLabel: 'next >',
      prevLabel: '< previous',
      doneLabel: 'Exit',
      skipLabel: 'Exit',
      exitOnEsc: true,
      exitOnOverlayClick: false
    });
    this.introJS.start();
    this.introJS.onexit(_ => localStorage.setItem(IntroService.INTRO_VIEWED_KEY, IntroService.INTRO_VIEWED_VALUE));
  }

}
