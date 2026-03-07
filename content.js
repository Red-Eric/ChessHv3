const default_fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const apiExpiration =
  "https://api.timezonedb.com/v2.1/list-time-zone?key=WPOK8LWQNYUI&format=json&country=FR";

let debugEngine = false;

let url = window.location.href;

const BrillantSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="" width="24" height="24" viewBox="0 0 18 19">
      <g id="Brilliant">
    <path class="icon-shadow" opacity="0.3" d="M9,.5a9,9,0,1,0,9,9A9,9,0,0,0,9,.5Z"></path>
    <path class="icon-background" fill="#26c2a3" d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path>
    <g class="icon-component-shadow" opacity="0.2">
      <path d="M12.57,14.6a.51.51,0,0,1,0,.13.44.44,0,0,1-.08.11l-.11.08-.13,0h-2l-.13,0L10,14.84A.41.41,0,0,1,10,14.6V12.7a.32.32,0,0,1,.09-.23.39.39,0,0,1,.1-.08l.13,0h2a.31.31,0,0,1,.24.1.39.39,0,0,1,.08.1.51.51,0,0,1,0,.13Zm-.12-3.93a.17.17,0,0,1,0,.12.41.41,0,0,1-.07.11.4.4,0,0,1-.23.08H10.35a.31.31,0,0,1-.34-.31L9.86,3.9A.36.36,0,0,1,10,3.66a.23.23,0,0,1,.11-.08.27.27,0,0,1,.13,0H12.3a.32.32,0,0,1,.25.1.36.36,0,0,1,.09.24Z"></path>
      <path d="M8.07,14.6a.51.51,0,0,1,0,.13.44.44,0,0,1-.08.11l-.11.08-.13,0h-2l-.13,0-.11-.08a.41.41,0,0,1-.08-.24V12.7a.27.27,0,0,1,0-.13.36.36,0,0,1,.07-.1.39.39,0,0,1,.1-.08l.13,0h2a.31.31,0,0,1,.24.1.39.39,0,0,1,.08.1.51.51,0,0,1,0,.13ZM8,10.67a.17.17,0,0,1,0,.12.41.41,0,0,1-.07.11.4.4,0,0,1-.23.08H5.85a.31.31,0,0,1-.34-.31L5.36,3.9a.36.36,0,0,1,.09-.24.23.23,0,0,1,.11-.08.27.27,0,0,1,.13,0H7.8a.35.35,0,0,1,.25.1.36.36,0,0,1,.09.24Z"></path>
    </g>
    <g>
      <path class="icon-component" fill="#fff" d="M12.57,14.1a.51.51,0,0,1,0,.13.44.44,0,0,1-.08.11l-.11.08-.13,0h-2l-.13,0L10,14.34A.41.41,0,0,1,10,14.1V12.2A.32.32,0,0,1,10,12a.39.39,0,0,1,.1-.08l.13,0h2a.31.31,0,0,1,.24.1.39.39,0,0,1,.08.1.51.51,0,0,1,0,.13Zm-.12-3.93a.17.17,0,0,1,0,.12.41.41,0,0,1-.07.11.4.4,0,0,1-.23.08H10.35a.31.31,0,0,1-.34-.31L9.86,3.4A.36.36,0,0,1,10,3.16a.23.23,0,0,1,.11-.08.27.27,0,0,1,.13,0H12.3a.32.32,0,0,1,.25.1.36.36,0,0,1,.09.24Z"></path>
      <path class="icon-component" fill="#fff" d="M8.07,14.1a.51.51,0,0,1,0,.13.44.44,0,0,1-.08.11l-.11.08-.13,0h-2l-.13,0-.11-.08a.41.41,0,0,1-.08-.24V12.2a.27.27,0,0,1,0-.13.36.36,0,0,1,.07-.1.39.39,0,0,1,.1-.08l.13,0h2A.31.31,0,0,1,8,12a.39.39,0,0,1,.08.1.51.51,0,0,1,0,.13ZM8,10.17a.17.17,0,0,1,0,.12.41.41,0,0,1-.07.11.4.4,0,0,1-.23.08H5.85a.31.31,0,0,1-.34-.31L5.36,3.4a.36.36,0,0,1,.09-.24.23.23,0,0,1,.11-.08.27.27,0,0,1,.13,0H7.8a.35.35,0,0,1,.25.1.36.36,0,0,1,.09.24Z"></path>
    </g>
  </g>
    </svg>`;

const greatMoveSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="" width="24" height="24" viewBox="0 0 18 19">
      <g id="great_find">
    <path class="icon-shadow" opacity="0.3" d="M9,.5a9,9,0,1,0,9,9A9,9,0,0,0,9,.5Z"></path>
    <path class="icon-background" fill="#749BBF" d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path>
    <g>
      <g class="icon-component-shadow" opacity="0.2">
        <path d="M10.32,14.6a.27.27,0,0,1,0,.13.44.44,0,0,1-.08.11l-.11.08-.13,0H8l-.13,0-.11-.08a.41.41,0,0,1-.08-.24V12.7a.27.27,0,0,1,0-.13.36.36,0,0,1,.07-.1.39.39,0,0,1,.1-.08l.13,0h2a.31.31,0,0,1,.24.1.39.39,0,0,1,.08.1.51.51,0,0,1,0,.13Zm-.12-3.93a.17.17,0,0,1,0,.12.41.41,0,0,1-.07.11.4.4,0,0,1-.23.08H8.1a.31.31,0,0,1-.34-.31L7.61,3.9a.36.36,0,0,1,.09-.24.23.23,0,0,1,.11-.08.27.27,0,0,1,.13,0h2.11a.32.32,0,0,1,.25.1.36.36,0,0,1,.09.24Z"></path>
      </g>
      <path class="icon-component" fill="#fff" d="M10.32,14.1a.27.27,0,0,1,0,.13.44.44,0,0,1-.08.11l-.11.08-.13,0H8l-.13,0-.11-.08a.41.41,0,0,1-.08-.24V12.2a.27.27,0,0,1,0-.13.36.36,0,0,1,.07-.1.39.39,0,0,1,.1-.08l.13,0h2a.31.31,0,0,1,.24.1.39.39,0,0,1,.08.1.51.51,0,0,1,0,.13Zm-.12-3.93a.17.17,0,0,1,0,.12.41.41,0,0,1-.07.11.4.4,0,0,1-.23.08H8.1a.31.31,0,0,1-.34-.31L7.61,3.4a.36.36,0,0,1,.09-.24.23.23,0,0,1,.11-.08.27.27,0,0,1,.13,0h2.11a.32.32,0,0,1,.25.1.36.36,0,0,1,.09.24Z"></path>
    </g>
  </g>
    </svg>`;

const bookSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="" width="24" height="24" viewBox="0 0 18 19">
      <g id="book">
    <path class="icon-shadow" opacity="0.3" d="M9,.5a9,9,0,1,0,9,9A9,9,0,0,0,9,.5Z"></path>
    <path class="icon-background" fill="#D5A47D" d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path>
    <g>
      <path class="icon-component-shadow" opacity="0.3" isolation="isolate" d="M8.45,5.9c-1-.75-2.51-1.09-4.83-1.09H2.54v8.71H3.62a8.16,8.16,0,0,1,4.83,1.17Z"></path>
      <path class="icon-component-shadow" opacity="0.3" isolation="isolate" d="M9.54,14.69a8.14,8.14,0,0,1,4.84-1.17h1.08V4.81H14.38c-2.31,0-3.81.34-4.84,1.09Z"></path>
      <path class="icon-component" fill="#fff" d="M8.45,5.4c-1-.75-2.51-1.09-4.83-1.09H3V13h.58a8.09,8.09,0,0,1,4.83,1.17Z"></path>
      <path class="icon-component" fill="#fff" d="M9.54,14.19A8.14,8.14,0,0,1,14.38,13H15V4.31h-.58c-2.31,0-3.81.34-4.84,1.09Z"></path>
    </g>
  </g>
    </svg>`;

const bestMoveSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="" width="24" height="24" viewBox="0 0 18 19">
      <g id="best">
    <path class="icon-shadow" opacity="0.3" d="M9,.5a9,9,0,1,0,9,9A9,9,0,0,0,9,.5Z"></path>
    <path class="icon-background" fill="#81B64C" d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path>
    <path class="icon-component-shadow" opacity="0.2" d="M9,3.43a.5.5,0,0,0-.27.08.46.46,0,0,0-.17.22L7.24,7.17l-3.68.19a.52.52,0,0,0-.26.1.53.53,0,0,0-.16.23.45.45,0,0,0,0,.28.44.44,0,0,0,.15.23l2.86,2.32-1,3.56a.45.45,0,0,0,0,.28.46.46,0,0,0,.17.22.41.41,0,0,0,.26.09.43.43,0,0,0,.27-.08l3.09-2,3.09,2a.46.46,0,0,0,.53,0,.46.46,0,0,0,.17-.22.53.53,0,0,0,0-.28l-1-3.56L14.71,8.2A.44.44,0,0,0,14.86,8a.45.45,0,0,0,0-.28.53.53,0,0,0-.16-.23.52.52,0,0,0-.26-.1l-3.68-.2L9.44,3.73a.46.46,0,0,0-.17-.22A.5.5,0,0,0,9,3.43Z"></path>
    <path class="icon-component" fill="#fff" d="M9,2.93A.5.5,0,0,0,8.73,3a.46.46,0,0,0-.17.22L7.24,6.67l-3.68.19A.52.52,0,0,0,3.3,7a.53.53,0,0,0-.16.23.45.45,0,0,0,0,.28.44.44,0,0,0,.15.23L6.15,10l-1,3.56a.45.45,0,0,0,0,.28.46.46,0,0,0,.17.22.41.41,0,0,0,.26.09.43.43,0,0,0,.27-.08l3.09-2,3.09,2a.46.46,0,0,0,.53,0,.46.46,0,0,0,.17-.22.53.53,0,0,0,0-.28l-1-3.56L14.71,7.7a.44.44,0,0,0,.15-.23.45.45,0,0,0,0-.28A.53.53,0,0,0,14.7,7a.52.52,0,0,0-.26-.1l-3.68-.2L9.44,3.23A.46.46,0,0,0,9.27,3,.5.5,0,0,0,9,2.93Z"></path>
  </g>
    </svg>`;

const excellentMoveSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="" width="24" height="24" viewBox="0 0 18 19">
      <g id="excellent">
    <g>
      <path class="icon-shadow" opacity="0.3" d="M9,.5a9,9,0,1,0,9,9A9,9,0,0,0,9,.5Z"></path>
      <path class="icon-background" fill="#81B64C" d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path>
    </g>
    <g class="icon-component-shadow" opacity="0.2">
      <path d="M13.79,11.34c0-.2.4-.53.4-.94S14,9.72,14,9.58a2.06,2.06,0,0,0,.18-.83,1,1,0,0,0-.3-.69,1.13,1.13,0,0,0-.55-.2,10.29,10.29,0,0,1-2.07,0c-.37-.23,0-1.18.18-1.7S11.9,4,10.62,3.7c-.69-.17-.66.37-.78.9-.05.21-.09.43-.13.57A5,5,0,0,1,7.05,8.23a1.57,1.57,0,0,1-.42.18v4.94A7.23,7.23,0,0,1,8,13.53c.52.12.91.25,1.44.33A11.11,11.11,0,0,0,11,14a6.65,6.65,0,0,0,1.18,0,1.09,1.09,0,0,0,1-.59.66.66,0,0,0,.06-.2,1.63,1.63,0,0,1,.07-.3c.13-.28.37-.3.5-.68S13.74,11.53,13.79,11.34Z"></path>
      <path d="M5.49,8.09H4.31a.5.5,0,0,0-.5.5v4.56a.5.5,0,0,0,.5.5H5.49a.5.5,0,0,0,.5-.5V8.59A.5.5,0,0,0,5.49,8.09Z"></path>
    </g>
    <g>
      <path class="icon-component" fill="#fff" d="M13.79,10.84c0-.2.4-.53.4-.94S14,9.22,14,9.08a2.06,2.06,0,0,0,.18-.83,1,1,0,0,0-.3-.69,1.13,1.13,0,0,0-.55-.2,10.29,10.29,0,0,1-2.07,0c-.37-.23,0-1.18.18-1.7s.51-2.12-.77-2.43c-.69-.17-.66.37-.78.9-.05.21-.09.43-.13.57A5,5,0,0,1,7.05,7.73a1.57,1.57,0,0,1-.42.18v4.94A7.23,7.23,0,0,1,8,13c.52.12.91.25,1.44.33a11.11,11.11,0,0,0,1.62.16,6.65,6.65,0,0,0,1.18,0,1.09,1.09,0,0,0,1-.59.66.66,0,0,0,.06-.2,1.63,1.63,0,0,1,.07-.3c.13-.28.37-.3.5-.68S13.74,11,13.79,10.84Z"></path>
      <path class="icon-component" fill="#fff" d="M5.49,7.59H4.31a.5.5,0,0,0-.5.5v4.56a.5.5,0,0,0,.5.5H5.49a.5.5,0,0,0,.5-.5V8.09A.5.5,0,0,0,5.49,7.59Z"></path>
    </g>
  </g>
    </svg>`;

const goodMoveSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="" width="24" height="24" viewBox="0 0 18 19">
      <g id="good">
    <g>
      <path class="icon-shadow" opacity="0.3" d="M9,.5a9,9,0,1,0,9,9A9,9,0,0,0,9,.5Z"></path>
      <path class="icon-background" fill="#95b776" d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path>
    </g>
    <g>
      <path class="icon-component-shadow" opacity="0.2" d="M15.11,6.81,9.45,12.47,7.79,14.13a.39.39,0,0,1-.28.11.39.39,0,0,1-.27-.11L2.89,9.78a.39.39,0,0,1-.11-.28.39.39,0,0,1,.11-.27L4.28,7.85a.34.34,0,0,1,.12-.09l.15,0a.37.37,0,0,1,.15,0,.38.38,0,0,1,.13.09l2.69,2.68,5.65-5.65a.38.38,0,0,1,.13-.09.37.37,0,0,1,.15,0,.4.4,0,0,1,.15,0,.34.34,0,0,1,.12.09l1.39,1.38a.41.41,0,0,1,.08.13.33.33,0,0,1,0,.15.4.4,0,0,1,0,.15A.5.5,0,0,1,15.11,6.81Z"></path>
      <path class="icon-component" fill="#fff" d="M15.11,6.31,9.45,12,7.79,13.63a.39.39,0,0,1-.28.11.39.39,0,0,1-.27-.11L2.89,9.28A.39.39,0,0,1,2.78,9a.39.39,0,0,1,.11-.27L4.28,7.35a.34.34,0,0,1,.12-.09l.15,0a.37.37,0,0,1,.15,0,.38.38,0,0,1,.13.09L7.52,10l5.65-5.65a.38.38,0,0,1,.13-.09.37.37,0,0,1,.15,0,.4.4,0,0,1,.15,0,.34.34,0,0,1,.12.09l1.39,1.38a.41.41,0,0,1,.08.13.33.33,0,0,1,0,.15.4.4,0,0,1,0,.15A.5.5,0,0,1,15.11,6.31Z"></path>
    </g>
  </g>
    </svg>`;

const inaccuracyMoveSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="" width="24" height="24" viewBox="0 0 18 19">
      <g id="inaccuracy">
    <path class="icon-shadow" opacity="0.3" d="M9,.5a9,9,0,1,0,9,9A9,9,0,0,0,9,.5Z"></path>
    <path class="icon-background" fill="#F7C631" d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path>
    <g class="icon-component-shadow" opacity="0.2">
      <path d="M13.66,14.8a.28.28,0,0,1,0,.13.23.23,0,0,1-.08.11.28.28,0,0,1-.11.08l-.12,0h-2l-.13,0a.27.27,0,0,1-.1-.08A.36.36,0,0,1,11,14.8V12.9a.59.59,0,0,1,0-.13.36.36,0,0,1,.07-.1l.1-.08.13,0h2a.33.33,0,0,1,.23.1.39.39,0,0,1,.08.1.28.28,0,0,1,0,.13Zm-.12-3.93a.31.31,0,0,1,0,.13.3.3,0,0,1-.07.1.3.3,0,0,1-.23.08H11.43a.31.31,0,0,1-.34-.31L10.94,4.1A.5.5,0,0,1,11,3.86l.11-.08.13,0h2.11a.35.35,0,0,1,.26.1.41.41,0,0,1,.08.24Z"></path>
      <path d="M7.65,14.82a.27.27,0,0,1,0,.12.26.26,0,0,1-.07.11l-.1.07-.13,0H5.43a.25.25,0,0,1-.12,0,.27.27,0,0,1-.1-.08.31.31,0,0,1-.09-.22V13a.36.36,0,0,1,.09-.23l.1-.07.12,0H7.32a.32.32,0,0,1,.23.09.3.3,0,0,1,.07.1.28.28,0,0,1,0,.13Zm2.2-7.17a3.1,3.1,0,0,1-.36.73A5.58,5.58,0,0,1,9,9a4.85,4.85,0,0,1-.52.49,8,8,0,0,0-.65.63,1,1,0,0,0-.27.7V11a.21.21,0,0,1,0,.12.17.17,0,0,1-.06.1.23.23,0,0,1-.1.07l-.12,0H5.53a.21.21,0,0,1-.12,0,.18.18,0,0,1-.1-.07.2.2,0,0,1-.08-.1.37.37,0,0,1,0-.12v-.35a2.68,2.68,0,0,1,.13-.84,2.91,2.91,0,0,1,.33-.66,3.38,3.38,0,0,1,.45-.55c.16-.15.33-.29.49-.42a7.84,7.84,0,0,0,.65-.64,1,1,0,0,0,.25-.67.77.77,0,0,0-.07-.34.67.67,0,0,0-.23-.27A1.16,1.16,0,0,0,6.49,6,1.61,1.61,0,0,0,6,6.11a3,3,0,0,0-.41.18,1.75,1.75,0,0,0-.29.18l-.11.09A.5.5,0,0,1,5,6.62a.31.31,0,0,1-.21-.13l-1-1.21a.3.3,0,0,1,0-.4A1.36,1.36,0,0,1,4,4.68a3.07,3.07,0,0,1,.56-.38,5.49,5.49,0,0,1,.9-.37,3.69,3.69,0,0,1,1.19-.17,3.92,3.92,0,0,1,2.3.75,2.85,2.85,0,0,1,.77.92A2.82,2.82,0,0,1,10,6.71,3,3,0,0,1,9.85,7.65Z"></path>
    </g>
    <g>
      <path class="icon-component" fill="#fff" d="M13.66,14.3a.28.28,0,0,1,0,.13.23.23,0,0,1-.08.11.28.28,0,0,1-.11.08l-.12,0h-2l-.13,0a.27.27,0,0,1-.1-.08A.36.36,0,0,1,11,14.3V12.4a.59.59,0,0,1,0-.13.36.36,0,0,1,.07-.1l.1-.08.13,0h2a.33.33,0,0,1,.23.1.39.39,0,0,1,.08.1.28.28,0,0,1,0,.13Zm-.12-3.93a.31.31,0,0,1,0,.13.3.3,0,0,1-.07.1.3.3,0,0,1-.23.08H11.43a.31.31,0,0,1-.34-.31L10.94,3.6A.5.5,0,0,1,11,3.36l.11-.08.13,0h2.11a.35.35,0,0,1,.26.1.41.41,0,0,1,.08.24Z"></path>
      <path class="icon-component" fill="#fff" d="M7.65,14.32a.27.27,0,0,1,0,.12.26.26,0,0,1-.07.11l-.1.07-.13,0H5.43a.25.25,0,0,1-.12,0,.27.27,0,0,1-.1-.08.31.31,0,0,1-.09-.22V12.49a.36.36,0,0,1,.09-.23l.1-.07.12,0H7.32a.32.32,0,0,1,.23.09.3.3,0,0,1,.07.1.28.28,0,0,1,0,.13Zm2.2-7.17a3.1,3.1,0,0,1-.36.73,5.58,5.58,0,0,1-.49.6A4.85,4.85,0,0,1,8.48,9a8,8,0,0,0-.65.63,1,1,0,0,0-.27.7v.22a.21.21,0,0,1,0,.12.17.17,0,0,1-.06.1.23.23,0,0,1-.1.07l-.12,0H5.53a.21.21,0,0,1-.12,0,.18.18,0,0,1-.1-.07.2.2,0,0,1-.08-.1.37.37,0,0,1,0-.12v-.35a2.68,2.68,0,0,1,.13-.84,2.91,2.91,0,0,1,.33-.66,3.38,3.38,0,0,1,.45-.55c.16-.15.33-.29.49-.42a7.84,7.84,0,0,0,.65-.64,1,1,0,0,0,.25-.67.77.77,0,0,0-.07-.34.67.67,0,0,0-.23-.27,1.16,1.16,0,0,0-.72-.24A1.61,1.61,0,0,0,6,5.61a3,3,0,0,0-.41.18A1.75,1.75,0,0,0,5.3,6l-.11.09A.5.5,0,0,1,5,6.12.31.31,0,0,1,4.74,6l-1-1.21a.3.3,0,0,1,0-.4A1.36,1.36,0,0,1,4,4.18a3.07,3.07,0,0,1,.56-.38,5.49,5.49,0,0,1,.9-.37,3.69,3.69,0,0,1,1.19-.17A3.92,3.92,0,0,1,8.93,4a2.85,2.85,0,0,1,.77.92A2.82,2.82,0,0,1,10,6.21,3,3,0,0,1,9.85,7.15Z"></path>
    </g>
  </g>
    </svg>`;

const mistakeSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="" width="24" height="24" viewBox="0 0 18 19">
      <g id="mistake">
    <g>
      <path class="icon-shadow" opacity="0.3" d="M9,.5a9,9,0,1,0,9,9A9,9,0,0,0,9,.5Z"></path>
      <path class="icon-background" fill="#FFA459" d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path>
    </g>
    <g>
      <g class="icon-component-shadow" opacity="0.2">
        <path d="M9.92,15a.27.27,0,0,1,0,.12.41.41,0,0,1-.07.11.32.32,0,0,1-.23.09H7.7a.25.25,0,0,1-.12,0,.27.27,0,0,1-.1-.08A.31.31,0,0,1,7.39,15V13.19A.32.32,0,0,1,7.48,13l.1-.07.12,0H9.59a.32.32,0,0,1,.23.09.61.61,0,0,1,.07.1.28.28,0,0,1,0,.13Zm2.2-7.17a3.1,3.1,0,0,1-.36.73,5.58,5.58,0,0,1-.49.6,6,6,0,0,1-.52.49,8,8,0,0,0-.65.63,1,1,0,0,0-.27.7v.22a.24.24,0,0,1,0,.12.17.17,0,0,1-.06.1.3.3,0,0,1-.1.07l-.12,0H7.79l-.12,0a.3.3,0,0,1-.1-.07.26.26,0,0,1-.07-.1.37.37,0,0,1,0-.12v-.35A2.42,2.42,0,0,1,7.61,10a2.55,2.55,0,0,1,.33-.66,3.38,3.38,0,0,1,.45-.55c.16-.15.33-.29.49-.42a7.73,7.73,0,0,0,.64-.64,1,1,0,0,0,.26-.67.77.77,0,0,0-.07-.34.75.75,0,0,0-.23-.27,1.16,1.16,0,0,0-.72-.24,1.61,1.61,0,0,0-.49.07,3,3,0,0,0-.41.18,1.41,1.41,0,0,0-.29.18l-.11.09a.5.5,0,0,1-.24.06A.31.31,0,0,1,7,6.69L6,5.48a.29.29,0,0,1,0-.4,1.36,1.36,0,0,1,.21-.2,3.07,3.07,0,0,1,.56-.38,5.38,5.38,0,0,1,.89-.37A3.75,3.75,0,0,1,8.9,4a4.07,4.07,0,0,1,1.2.19,4,4,0,0,1,1.09.56,2.76,2.76,0,0,1,.78.92,2.82,2.82,0,0,1,.28,1.28A3,3,0,0,1,12.12,7.85Z"></path>
      </g>
      <path class="icon-component" fill="#fff" d="M9.92,14.52a.27.27,0,0,1,0,.12.41.41,0,0,1-.07.11.32.32,0,0,1-.23.09H7.7a.25.25,0,0,1-.12,0,.27.27,0,0,1-.1-.08.31.31,0,0,1-.09-.22V12.69a.32.32,0,0,1,.09-.23l.1-.07.12,0H9.59a.32.32,0,0,1,.23.09.61.61,0,0,1,.07.1.28.28,0,0,1,0,.13Zm2.2-7.17a3.1,3.1,0,0,1-.36.73,5.58,5.58,0,0,1-.49.6,6,6,0,0,1-.52.49,8,8,0,0,0-.65.63,1,1,0,0,0-.27.7v.22a.24.24,0,0,1,0,.12.17.17,0,0,1-.06.1.3.3,0,0,1-.1.07l-.12,0H7.79l-.12,0a.3.3,0,0,1-.1-.07.26.26,0,0,1-.07-.1.37.37,0,0,1,0-.12v-.35a2.42,2.42,0,0,1,.13-.84,2.55,2.55,0,0,1,.33-.66,3.38,3.38,0,0,1,.45-.55c.16-.15.33-.29.49-.42a7.73,7.73,0,0,0,.64-.64,1,1,0,0,0,.26-.67.77.77,0,0,0-.07-.34A.75.75,0,0,0,9.48,6a1.16,1.16,0,0,0-.72-.24,1.61,1.61,0,0,0-.49.07A3,3,0,0,0,7.86,6a1.41,1.41,0,0,0-.29.18l-.11.09a.5.5,0,0,1-.24.06A.31.31,0,0,1,7,6.19L6,5a.29.29,0,0,1,0-.4,1.36,1.36,0,0,1,.21-.2A3.07,3.07,0,0,1,6.81,4a5.38,5.38,0,0,1,.89-.37,3.75,3.75,0,0,1,1.2-.17,4.07,4.07,0,0,1,1.2.19,4,4,0,0,1,1.09.56,2.76,2.76,0,0,1,.78.92,2.82,2.82,0,0,1,.28,1.28A3,3,0,0,1,12.12,7.35Z"></path>
    </g>
  </g>
    </svg>`;

const missSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="" width="24" height="24" viewBox="0 0 18 19">
      <defs><style>.cls-1{fill:#f1f2f2;}.cls-2{fill:#FF7769;}.cls-3{opacity:.2;}.cls-4{opacity:.3;}</style></defs><g id="incorrect"><path class="cls-4" d="M9,.5C4.03,.5,0,4.53,0,9.5s4.03,9,9,9,9-4.03,9-9S13.97,.5,9,.5Z"></path><path class="cls-2" d="M9,0C4.03,0,0,4.03,0,9s4.03,9,9,9,9-4.03,9-9S13.97,0,9,0Z"></path><g class="cls-3"><path d="M13.99,12.51s.06,.08,.08,.13c.02,.05,.03,.1,.03,.15s-.01,.1-.03,.15c-.02,.05-.05,.09-.08,.13l-1.37,1.37s-.08,.06-.13,.08c-.05,.02-.1,.03-.15,.03s-.1-.01-.15-.03c-.05-.02-.09-.05-.13-.08l-3.06-3.06-3.06,3.06s-.08,.06-.13,.08c-.05,.02-.1,.03-.15,.03s-.1-.01-.15-.03c-.05-.02-.09-.05-.13-.08l-1.37-1.37c-.07-.07-.11-.17-.11-.28s.04-.2,.11-.28l3.06-3.06-3.06-3.06c-.07-.07-.11-.17-.11-.28s.04-.2,.11-.28l1.37-1.37c.07-.07,.17-.11,.28-.11s.2,.04,.28,.11l3.06,3.06,3.06-3.06c.07-.07,.17-.11,.28-.11s.2,.04,.28,.11l1.37,1.37s.06,.08,.08,.13c.02,.05,.03,.1,.03,.15s-.01,.1-.03,.15c-.02,.05-.05,.09-.08,.13l-3.06,3.06,3.06,3.06Z"></path></g><path class="cls-1" d="M13.99,12.01s.06,.08,.08,.13c.02,.05,.03,.1,.03,.15s-.01,.1-.03,.15c-.02,.05-.05,.09-.08,.13l-1.37,1.37s-.08,.06-.13,.08c-.05,.02-.1,.03-.15,.03s-.1-.01-.15-.03c-.05-.02-.09-.05-.13-.08l-3.06-3.06-3.06,3.06s-.08,.06-.13,.08c-.05,.02-.1,.03-.15,.03s-.1-.01-.15-.03c-.05-.02-.09-.05-.13-.08l-1.37-1.37c-.07-.07-.11-.17-.11-.28s.04-.2,.11-.28l3.06-3.06-3.06-3.06c-.07-.07-.11-.17-.11-.28s.04-.2,.11-.28l1.37-1.37c.07-.07,.17-.11,.28-.11s.2,.04,.28,.11l3.06,3.06,3.06-3.06c.07-.07,.17-.11,.28-.11s.2,.04,.28,.11l1.37,1.37s.06,.08,.08,.13c.02,.05,.03,.1,.03,.15s-.01,.1-.03,.15c-.02,.05-.05,.09-.08,.13l-3.06,3.06,3.06,3.06Z"></path></g>
    </svg>`;

const blunderSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="" width="24" height="24" viewBox="0 0 18 19">
      <g id="blunder">
    <path class="icon-shadow" opacity="0.3" d="M9,.5a9,9,0,1,0,9,9A9,9,0,0,0,9,.5Z"></path>
    <path class="icon-background" fill="#FA412D" d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path>
    <g class="icon-component-shadow" opacity="0.2">
      <path d="M14.74,5.45A2.58,2.58,0,0,0,14,4.54,3.76,3.76,0,0,0,12.89,4a4.07,4.07,0,0,0-1.2-.19A3.92,3.92,0,0,0,10.51,4a5.87,5.87,0,0,0-.9.37,3,3,0,0,0-.32.2,3.46,3.46,0,0,1,.42.63,3.29,3.29,0,0,1,.36,1.47.31.31,0,0,0,.19-.06l.11-.08a2.9,2.9,0,0,1,.29-.19,3.89,3.89,0,0,1,.41-.17,1.55,1.55,0,0,1,.48-.07,1.1,1.1,0,0,1,.72.24.72.72,0,0,1,.23.26.8.8,0,0,1,.07.34,1,1,0,0,1-.25.67,7.71,7.71,0,0,1-.65.63,6.2,6.2,0,0,0-.48.43,2.93,2.93,0,0,0-.45.54,2.55,2.55,0,0,0-.33.66,2.62,2.62,0,0,0-.13.83V11a.24.24,0,0,0,0,.12.35.35,0,0,0,.17.17l.12,0h1.71l.12,0a.23.23,0,0,0,.1-.07.21.21,0,0,0,.06-.1.27.27,0,0,0,0-.12V10.8a1,1,0,0,1,.26-.7q.27-.28.66-.63A5.79,5.79,0,0,0,14.05,9a4.51,4.51,0,0,0,.48-.6,2.56,2.56,0,0,0,.36-.72,2.81,2.81,0,0,0,.14-1A2.66,2.66,0,0,0,14.74,5.45Z"></path>
      <path d="M12.38,12.65H10.5l-.12,0a.34.34,0,0,0-.18.29v1.82a.36.36,0,0,0,.08.23.23.23,0,0,0,.1.07l.12,0h1.88a.24.24,0,0,0,.12,0,.26.26,0,0,0,.11-.07.36.36,0,0,0,.07-.1.28.28,0,0,0,0-.13V13a.27.27,0,0,0,0-.12.61.61,0,0,0-.07-.1A.32.32,0,0,0,12.38,12.65Z"></path>
      <path d="M6.79,12.65H4.91l-.12,0a.34.34,0,0,0-.18.29v1.82a.36.36,0,0,0,.08.23.23.23,0,0,0,.1.07l.12,0H6.79a.24.24,0,0,0,.12,0A.26.26,0,0,0,7,15a.36.36,0,0,0,.07-.1.28.28,0,0,0,0-.13V13a.27.27,0,0,0,0-.12.61.61,0,0,0-.07-.1A.32.32,0,0,0,6.79,12.65Z"></path>
      <path d="M8.39,4.54A3.76,3.76,0,0,0,7.3,4a4.07,4.07,0,0,0-1.2-.19A3.92,3.92,0,0,0,4.92,4a5.87,5.87,0,0,0-.9.37,3.37,3.37,0,0,0-.55.38l-.21.19a.32.32,0,0,0,0,.41l1,1.2a.26.26,0,0,0,.2.12.48.48,0,0,0,.24-.06l.11-.08a2.9,2.9,0,0,1,.29-.19l.4-.17A1.66,1.66,0,0,1,6,6.06a1.1,1.1,0,0,1,.72.24.72.72,0,0,1,.23.26A.77.77,0,0,1,7,6.9a1,1,0,0,1-.26.67,7.6,7.6,0,0,1-.64.63,6.28,6.28,0,0,0-.49.43,2.93,2.93,0,0,0-.45.54,2.72,2.72,0,0,0-.33.66,2.62,2.62,0,0,0-.13.83V11a.43.43,0,0,0,0,.12.39.39,0,0,0,.08.1.18.18,0,0,0,.1.07.21.21,0,0,0,.12,0H6.72l.12,0a.23.23,0,0,0,.1-.07.36.36,0,0,0,.07-.1A.5.5,0,0,0,7,11V10.8a1,1,0,0,1,.27-.7A8,8,0,0,1,8,9.47c.18-.15.35-.31.52-.48A7,7,0,0,0,9,8.39a3.23,3.23,0,0,0,.36-.72,3.07,3.07,0,0,0,.13-1,2.66,2.66,0,0,0-.29-1.27A2.58,2.58,0,0,0,8.39,4.54Z"></path>
    </g>
    <g>
      <path class="icon-component" fill="#fff" d="M14.74,5A2.58,2.58,0,0,0,14,4a3.76,3.76,0,0,0-1.09-.56,4.07,4.07,0,0,0-1.2-.19,3.92,3.92,0,0,0-1.18.17,5.87,5.87,0,0,0-.9.37,3,3,0,0,0-.32.2,3.46,3.46,0,0,1,.42.63,3.29,3.29,0,0,1,.36,1.47.31.31,0,0,0,.19-.06L10.37,6a2.9,2.9,0,0,1,.29-.19,3.89,3.89,0,0,1,.41-.17,1.55,1.55,0,0,1,.48-.07,1.1,1.1,0,0,1,.72.24.72.72,0,0,1,.23.26.8.8,0,0,1,.07.34,1,1,0,0,1-.25.67,7.71,7.71,0,0,1-.65.63,6.2,6.2,0,0,0-.48.43,2.93,2.93,0,0,0-.45.54,2.55,2.55,0,0,0-.33.66,2.62,2.62,0,0,0-.13.83v.35a.24.24,0,0,0,0,.12.35.35,0,0,0,.17.17l.12,0h1.71l.12,0a.23.23,0,0,0,.1-.07.21.21,0,0,0,.06-.1.27.27,0,0,0,0-.12V10.3a1,1,0,0,1,.26-.7q.27-.28.66-.63a5.79,5.79,0,0,0,.51-.48,4.51,4.51,0,0,0,.48-.6,2.56,2.56,0,0,0,.36-.72,2.81,2.81,0,0,0,.14-1A2.66,2.66,0,0,0,14.74,5Z"></path>
      <path class="icon-component" fill="#fff" d="M12.38,12.15H10.5l-.12,0a.34.34,0,0,0-.18.29v1.82a.36.36,0,0,0,.08.23.23.23,0,0,0,.1.07l.12,0h1.88a.24.24,0,0,0,.12,0,.26.26,0,0,0,.11-.07.36.36,0,0,0,.07-.1.28.28,0,0,0,0-.13V12.46a.27.27,0,0,0,0-.12.61.61,0,0,0-.07-.1A.32.32,0,0,0,12.38,12.15Z"></path>
      <path class="icon-component" fill="#fff" d="M6.79,12.15H4.91l-.12,0a.34.34,0,0,0-.18.29v1.82a.36.36,0,0,0,.08.23.23.23,0,0,0,.1.07l.12,0H6.79a.24.24,0,0,0,.12,0A.26.26,0,0,0,7,14.51a.36.36,0,0,0,.07-.1.28.28,0,0,0,0-.13V12.46a.27.27,0,0,0,0-.12.61.61,0,0,0-.07-.1A.32.32,0,0,0,6.79,12.15Z"></path>
      <path class="icon-component" fill="#fff" d="M8.39,4A3.76,3.76,0,0,0,7.3,3.48a4.07,4.07,0,0,0-1.2-.19,3.92,3.92,0,0,0-1.18.17,5.87,5.87,0,0,0-.9.37,3.37,3.37,0,0,0-.55.38l-.21.19a.32.32,0,0,0,0,.41l1,1.2a.26.26,0,0,0,.2.12.48.48,0,0,0,.24-.06L4.78,6a2.9,2.9,0,0,1,.29-.19l.4-.17A1.66,1.66,0,0,1,6,5.56a1.1,1.1,0,0,1,.72.24.72.72,0,0,1,.23.26A.77.77,0,0,1,7,6.4a1,1,0,0,1-.26.67,7.6,7.6,0,0,1-.64.63,6.28,6.28,0,0,0-.49.43,2.93,2.93,0,0,0-.45.54,2.72,2.72,0,0,0-.33.66,2.62,2.62,0,0,0-.13.83v.35a.43.43,0,0,0,0,.12.39.39,0,0,0,.08.1.18.18,0,0,0,.1.07.21.21,0,0,0,.12,0H6.72l.12,0a.23.23,0,0,0,.1-.07.36.36,0,0,0,.07-.1.5.5,0,0,0,0-.12V10.3a1,1,0,0,1,.27-.7A8,8,0,0,1,8,9c.18-.15.35-.31.52-.48A7,7,0,0,0,9,7.89a3.23,3.23,0,0,0,.36-.72,3.07,3.07,0,0,0,.13-1A2.66,2.66,0,0,0,9.15,5,2.58,2.58,0,0,0,8.39,4Z"></path>
    </g>
  </g>
    </svg>`;

function placeSVGOnBoard(side, square, svgCode) {
  const board =
    document.querySelector("wc-chess-board") ||
    document.querySelector("cg-board");
  if (!board) return;

  const rect = board.getBoundingClientRect();
  const boardSize = rect.width;
  const squareSize = boardSize / 8;

  const file = square.charCodeAt(0) - 97;
  const rank = parseInt(square[1]);

  let x, y;

  if (side === "white") {
    x = file * squareSize;
    y = (8 - rank) * squareSize;
  } else {
    x = (7 - file) * squareSize;
    y = (rank - 1) * squareSize;
  }

  const squareContainer = document.createElement("div");
  squareContainer.style.position = "absolute";
  squareContainer.style.left = rect.left + x + "px";
  squareContainer.style.top = rect.top + y + "px";
  squareContainer.style.width = squareSize + "px";
  squareContainer.style.height = squareSize + "px";
  squareContainer.style.pointerEvents = "none";

  const wrapper = document.createElement("div");
  wrapper.innerHTML = svgCode;

  const svg = wrapper.querySelector("svg");
  svg.style.position = "absolute";
  svg.style.zIndex = "9999";

  squareContainer.appendChild(svg);
  document.body.appendChild(squareContainer);

  // Décalage pour que le centre du SVG soit au coin haut gauche
  requestAnimationFrame(() => {
    const box = svg.getBBox();
    svg.style.left = -box.width / 2 + "px";
    svg.style.top = -box.height / 2 + "px";
  });
}

// placeSVGOnBoard("white", "e2", blunderSVG)

function clickButtonsByText(text) {
  const buttons = Array.from(document.querySelectorAll("button"));
  const targetButtons = buttons.filter((btn) =>
    btn.innerText.trim().includes(text),
  );
  if (targetButtons.length === 0) return;
  targetButtons[0].click();
  targetButtons.shift();
  setTimeout(() => clickButtonsByText(text), 100);
}

function preInjection() {
  const s = document.createElement("script");
  s.src = chrome.runtime.getURL("a.js");
  (document.head || document.documentElement).appendChild(s);
  s.onload = () => s.remove();
}

preInjection();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function squareToPixels(square, boardInfo, orientation = "white") {
  const files = "abcdefgh";
  const file = files.indexOf(square[0]); // e = 4
  const rank = parseInt(square[1], 10) - 1; // 2 -> index 1

  const squareSize = boardInfo.width / 8;

  let x, y;

  if (orientation === "white") {
    x = boardInfo.left + file * squareSize + squareSize / 2;
    y = boardInfo.top + (7 - rank) * squareSize + squareSize / 2;
  } else {
    x = boardInfo.left + (7 - file) * squareSize + squareSize / 2;
    y = boardInfo.top + rank * squareSize + squareSize / 2;
  }

  return { x, y };
}

function countMoves(fenString) {
  const parts = fenString.split("moves");
  if (parts.length < 2) return 0;
  const movesPart = parts[1].trim();
  const movesArray = movesPart.split(/\s+/);
  return movesArray.length;
}

function randomIntBetween(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

function clearHighlightSquares() {
  document.querySelectorAll(".customH").forEach((el) => el.remove());
}

const interval = 100;

let config = {
  elo: 3500,
  lines: 5,
  colors: ["#0000ff", "#00ff00", "#FFFF00", "#f97316", "#ff0000"],
  depth: 10,
  delay: 100,
  style: "Default",
  autoMove: false,
  moveClassification: false,
  stat: false,
  winningMove: false,
  showEval: false,
  onlyShowEval: false,
  key: " ",
};

chrome.storage.local.get(["chessConfig"], (result) => {
  config = result.chessConfig || {
    elo: 3500,
    lines: 5,
    colors: ["#0000ff", "#00ff00", "#FFFF00", "#f97316", "#ff0000"],
    depth: 10,
    delay: 100,
    style: "Default",
    autoMove: false,
    moveClassification: false,
    stat: false,
    winningMove: false,
    showEval: false,
    onlyShowEval: false,
    key: " ",
  };

  engine.updateConfig(config.lines, config.depth, config.style, config.elo);
});

async function createWorker() {
  const url = `${chrome.runtime.getURL("lib/engine.js")}`;
  const blob = new Blob([`importScripts("${url}");`], {
    type: "application/javascript",
  });
  const blobUrl = URL.createObjectURL(blob);

  return new Worker(blobUrl);
}

class ChessAnalyzer {
  constructor({ depth = 12 } = {}) {
    this.depth = depth;

    this.engine = null;
    this._resolveEval = null;
    this._currentLines = [];

    // Cache FEN → { lines, bestMove }
    this._cache = new Map();

    // Queue interne
    this._queue = [];
    this._running = false;
  }

  // ─── Init ─────────────────────────────────────────────────────────────
  // Crée le Worker via blob URL (requis dans les extensions Chrome pour contourner la CSP)

  async init() {
    this.engine = await this._createWorker();
    await this._waitReady();
  }

  _createWorker() {
    return new Promise((resolve, reject) => {
      try {
        const stockfishUrl = chrome.runtime.getURL("lib/stockfish.js");
        const blob = new Blob([`importScripts("${stockfishUrl}");`], {
          type: "application/javascript",
        });
        const blobUrl = URL.createObjectURL(blob);
        const worker = new Worker(blobUrl);
        URL.revokeObjectURL(blobUrl); // libère l'URL dès que le worker est créé
        resolve(worker);
      } catch (e) {
        reject(new Error("Failed to create Stockfish worker: " + e.message));
      }
    });
  }

  _waitReady() {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(
        () => reject(new Error("Stockfish readyok timeout")),
        10_000,
      );

      const originalOnMessage = this.engine.onmessage;

      this.engine.onmessage = (e) => {
        if (e.data === "readyok") {
          clearTimeout(timeout);
          // Remettre le vrai handler en place
          this.engine.onmessage = (ev) => this._handleMessage(ev.data);
          resolve();
          return;
        }
        // Passer les autres messages au handler normal pendant l'init
        originalOnMessage?.(e);
      };

      this.engine.postMessage("uci");
      this.engine.postMessage("ucinewgame");
      this.engine.postMessage("isready");
    });
  }

  terminate() {
    this.engine?.terminate();
    this.engine = null;
  }

  reset() {
    this._cache.clear();
    this._queue = [];
    this._running = false;
  }
  async update(fenHistory, { whiteElo, blackElo, onProgress } = {}) {
    if (fenHistory.length < 2) throw new Error("Need at least 2 FENs");

  
    const newFens = fenHistory.filter((fen) => !this._cache.has(fen));

    if (newFens.length > 0) {
      await this._enqueueAndWait(newFens, () => {
        onProgress?.(this._cache.size / fenHistory.length);
      });
    }

    const positions = fenHistory.map((fen) => this._cache.get(fen));
    const withPlayed = this._attachPlayedMoves(positions, fenHistory);

    const classified = this._classifyMoves(withPlayed);

    const {
      white: whiteAcc,
      black: blackAcc,
      movesAccuracy,
    } = this._computeAccuracy(classified);

    const eloEst = this._computeEstimatedElo(classified, whiteElo, blackElo);

    const moves = classified.slice(1).map((pos, i) => ({
      moveIndex: i + 1,
      isWhite: i % 2 === 0,
      moveNumber: Math.ceil((i + 1) / 2),
      classification: pos.moveClassification,
      accuracy: movesAccuracy[i] ?? null,
      winPercent: this._getPositionWinPercentage(pos),
      cp: pos.lines[0]?.cp ?? null,
      mate: pos.lines[0]?.mate ?? null,
    }));

    return {
      white: {
        accuracy: parseFloat(whiteAcc.toFixed(1)),
        elo: eloEst?.white ?? null,
        acpl: eloEst?.whiteCpl ?? null,
      },
      black: {
        accuracy: parseFloat(blackAcc.toFixed(1)),
        elo: eloEst?.black ?? null,
        acpl: eloEst?.blackCpl ?? null,
      },
      moves,
      cached: fenHistory.length - newFens.length,
      computed: newFens.length,
    };
  }

  // ═══════════════════════════════════════════════════════════════════════
  // QUEUE
  // ═══════════════════════════════════════════════════════════════════════

  _enqueueAndWait(fens, onEach) {
    for (const fen of fens) {
      if (!this._cache.has(fen) && !this._queue.includes(fen)) {
        this._queue.push(fen);
      }
    }

    if (this._running) {
      // La queue tourne déjà, on attend juste que nos FENs soient résolus
      return this._waitUntilCached(fens);
    }

    return this._drainQueue(onEach);
  }

  async _drainQueue(onEach) {
    this._running = true;
    while (this._queue.length > 0) {
      const fen = this._queue.shift();
      if (this._cache.has(fen)) continue;

      const result = await this._evalPosition(fen);
      this._cache.set(fen, result);
      onEach?.(fen);
    }
    this._running = false;
  }

  _waitUntilCached(fens) {
    return new Promise((resolve) => {
      const check = () => {
        if (fens.every((f) => this._cache.has(f))) resolve();
        else setTimeout(check, 50);
      };
      check();
    });
  }

  // ═══════════════════════════════════════════════════════════════════════
  // STOCKFISH WRAPPER
  // ═══════════════════════════════════════════════════════════════════════

  _handleMessage(msg) {
    if (msg.startsWith("info") && msg.includes(" pv ")) {
      const depthMatch = msg.match(/\bdepth (\d+)/);
      const multiPvMatch = msg.match(/\bmultipv (\d+)/);
      const cpMatch = msg.match(/\bscore cp (-?\d+)/);
      const mateMatch = msg.match(/\bscore mate (-?\d+)/);
      const pvMatch = msg.match(/ pv (.+)/);
      if (!depthMatch || !multiPvMatch || !pvMatch) return;

      const multiPv = parseInt(multiPvMatch[1]);
      const pv = pvMatch[1].trim().split(" ");
      const line = { pv, depth: parseInt(depthMatch[1]), multiPv };
      if (cpMatch) line.cp = parseInt(cpMatch[1]);
      if (mateMatch) line.mate = parseInt(mateMatch[1]);
      this._currentLines[multiPv - 1] = line;
    }

    if (msg.startsWith("bestmove")) {
      const bestMove = msg.split(" ")[1];
      if (this._resolveEval) {
        this._resolveEval({
          lines: this._currentLines.filter(Boolean),
          bestMove,
        });
        this._resolveEval = null;
      }
    }
  }

  _evalPosition(fen) {
    return new Promise((resolve) => {
      this._currentLines = [];
      const whiteToPlay = fen.split(" ")[1] === "w";

      this._resolveEval = (result) => {
        if (!whiteToPlay) {
          result.lines = result.lines.map((line) => ({
            ...line,
            cp: line.cp !== undefined ? -line.cp : line.cp,
            mate: line.mate !== undefined ? -line.mate : line.mate,
          }));
        }
        resolve(result);
      };

      this.engine.postMessage(`position fen ${fen}`);
      this.engine.postMessage(`setoption name MultiPV value 2`);
      this.engine.postMessage(`go depth ${this.depth}`);
    });
  }

  // ═══════════════════════════════════════════════════════════════════════
  // DÉTECTION DU COUP JOUÉ
  // ═══════════════════════════════════════════════════════════════════════

  _attachPlayedMoves(positions, fenHistory) {
    const hasChessJs = typeof Chess !== "undefined";

    return positions.map((pos, i) => {
      if (i === 0) return { ...pos, playedWasBest: false };

      const prevBestMove = positions[i - 1]?.bestMove;
      if (!hasChessJs || !prevBestMove) return { ...pos, playedWasBest: false };

      try {
        const chess = new Chess(fenHistory[i - 1]);
        chess.move({
          from: prevBestMove.slice(0, 2),
          to: prevBestMove.slice(2, 4),
          promotion: prevBestMove[4] || undefined,
        });
        const fenAfterBest = chess.fen().split(" ").slice(0, 4).join(" ");
        const actualFen = fenHistory[i].split(" ").slice(0, 4).join(" ");
        return { ...pos, playedWasBest: fenAfterBest === actualFen };
      } catch {
        return { ...pos, playedWasBest: false };
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════════════
  // CLASSIFICATION — style Chess.com
  // ═══════════════════════════════════════════════════════════════════════

  _classifyMoves(positions) {
    const positionsWP = positions.map((p) => this._getPositionWinPercentage(p));

    return positions.map((pos, index) => {
      if (index === 0) return { ...pos, moveClassification: null };

      const prevPos = positions[index - 1];
      const isWhite = index % 2 === 1;
      const lastWP = positionsWP[index - 1];
      const wp = positionsWP[index];
      const isBestMove = pos.playedWasBest;
      const wpLoss = (lastWP - wp) * (isWhite ? 1 : -1);

      const altLine = prevPos.lines[1];
      const altWP = altLine ? this._getLineWinPercentage(altLine) : undefined;

      if (prevPos.lines.length === 1)
        return { ...pos, moveClassification: "forced" };

      if (isBestMove) {
        if (altWP !== undefined) {
          const gap = (wp - altWP) * (isWhite ? 1 : -1);
          if (gap >= 10) return { ...pos, moveClassification: "brilliant" };
          if (gap >= 5) return { ...pos, moveClassification: "great" };
        }
        return { ...pos, moveClassification: "best" };
      }

      if (wpLoss > 20) return { ...pos, moveClassification: "blunder" };

      if (wpLoss > 10) {
        const isMiss =
          altWP !== undefined ? (altWP - wp) * (isWhite ? 1 : -1) > 20 : false;
        return { ...pos, moveClassification: isMiss ? "miss" : "mistake" };
      }

      if (wpLoss > 5) return { ...pos, moveClassification: "inaccuracy" };
      if (wpLoss <= 2) return { ...pos, moveClassification: "excellent" };
      return { ...pos, moveClassification: "good" };
    });
  }

  // ═══════════════════════════════════════════════════════════════════════
  // ACCURACY
  // ═══════════════════════════════════════════════════════════════════════

  _computeAccuracy(positions) {
    const wp = positions.map((p) => this._getPositionWinPercentage(p));
    const weights = this._getAccuracyWeights(wp);
    const movesAccuracy = this._getMovesAccuracy(wp);
    return {
      white: this._getPlayerAccuracy(movesAccuracy, weights, "white"),
      black: this._getPlayerAccuracy(movesAccuracy, weights, "black"),
      movesAccuracy,
    };
  }

  _getPlayerAccuracy(movesAccuracy, weights, player) {
    const rem = player === "white" ? 0 : 1;
    const accs = movesAccuracy.filter((_, i) => i % 2 === rem);
    const wts = weights.filter((_, i) => i % 2 === rem);
    if (accs.length === 0) return 100;
    const wm = this._weightedMean(accs, wts);
    const hm = this._harmonicMean(accs.map((a) => Math.max(a, 10)));
    return (wm + hm) / 2;
  }

  _getAccuracyWeights(movesWP) {
    const windowSize = this._clamp(Math.ceil(movesWP.length / 10), 2, 8);
    const half = Math.round(windowSize / 2);
    const windows = [];
    for (let i = 1; i < movesWP.length; i++) {
      const s = i - half,
        e = i + half;
      if (s < 0) windows.push(movesWP.slice(0, windowSize));
      else if (e > movesWP.length) windows.push(movesWP.slice(-windowSize));
      else windows.push(movesWP.slice(s, e));
    }
    return windows.map((w) => this._clamp(this._stdDev(w), 0.5, 12));
  }

  _getMovesAccuracy(movesWP) {
    return movesWP.slice(1).map((wp, idx) => {
      const last = movesWP[idx];
      const isWhite = idx % 2 === 0;
      const diff = isWhite ? Math.max(0, last - wp) : Math.max(0, wp - last);
      const raw =
        103.1668100711649 * Math.exp(-0.04354415386753951 * diff) -
        3.166924740191411;
      return Math.min(100, Math.max(0, raw + 1));
    });
  }

  // ═══════════════════════════════════════════════════════════════════════
  // ELO ESTIMATION
  // ═══════════════════════════════════════════════════════════════════════

  _computeEstimatedElo(positions, whiteElo, blackElo) {
    if (positions.length < 2) return null;
    let prevCp = this._getPositionCp(positions[0]);
    let wLoss = 0,
      bLoss = 0;

    positions.slice(1).forEach((pos, i) => {
      const cp = this._getPositionCp(pos);
      if (i % 2 === 0) wLoss += cp > prevCp ? 0 : Math.min(prevCp - cp, 1000);
      else bLoss += cp < prevCp ? 0 : Math.min(cp - prevCp, 1000);
      prevCp = cp;
    });

    const n = positions.length - 1;
    const whiteCpl = wLoss / Math.ceil(n / 2);
    const blackCpl = bLoss / Math.floor(n / 2);

    return {
      white: Math.round(
        this._eloFromRatingAndCpl(whiteCpl, whiteElo ?? blackElo),
      ),
      black: Math.round(
        this._eloFromRatingAndCpl(blackCpl, blackElo ?? whiteElo),
      ),
      whiteCpl: Math.round(whiteCpl),
      blackCpl: Math.round(blackCpl),
    };
  }

  _eloFromAcpl(acpl) {
    return 3100 * Math.exp(-0.01 * acpl);
  }
  _acplFromElo(elo) {
    return -100 * Math.log(Math.min(elo, 3100) / 3100);
  }
  _eloFromRatingAndCpl(cpl, rating) {
    const base = this._eloFromAcpl(cpl);
    if (!rating) return base;
    const diff = cpl - this._acplFromElo(rating);
    if (diff === 0) return base;
    return diff > 0
      ? rating * Math.exp(-0.005 * diff)
      : rating / Math.exp(0.005 * diff);
  }

  // ═══════════════════════════════════════════════════════════════════════
  // WIN% HELPERS
  // ═══════════════════════════════════════════════════════════════════════

  _getWinPercentageFromCp(cp) {
    const c = this._clamp(cp, -1000, 1000);
    return 50 + 50 * (2 / (1 + Math.exp(-0.00368208 * c)) - 1);
  }
  _getLineWinPercentage(line) {
    if (line.cp !== undefined) return this._getWinPercentageFromCp(line.cp);
    if (line.mate !== undefined) return line.mate > 0 ? 100 : 0;
    throw new Error("No cp or mate in line");
  }
  _getPositionWinPercentage(pos) {
    return this._getLineWinPercentage(pos.lines[0]);
  }
  _getPositionCp(pos) {
    const l = pos.lines[0];
    if (l.cp !== undefined) return this._clamp(l.cp, -1000, 1000);
    if (l.mate !== undefined) return l.mate > 0 ? 1000 : -1000;
    throw new Error("No cp or mate");
  }

  // ═══════════════════════════════════════════════════════════════════════
  // MATH UTILS
  // ═══════════════════════════════════════════════════════════════════════

  _clamp(n, min, max) {
    return Math.min(max, Math.max(min, n));
  }
  _harmonicMean(arr) {
    return arr.length / arr.reduce((s, v) => s + 1 / v, 0);
  }
  _weightedMean(arr, w) {
    return (
      arr.reduce((s, v, i) => s + v * w[i], 0) /
      w.slice(0, arr.length).reduce((a, b) => a + b, 0)
    );
  }
  _stdDev(arr) {
    const m = arr.reduce((a, b) => a + b) / arr.length;
    return Math.sqrt(
      arr.map((x) => (x - m) ** 2).reduce((a, b) => a + b) / arr.length,
    );
  }
}

const analyzer = new ChessAnalyzer({ depth: 10 });

(async () => {
  await analyzer.init();
})();

async function createWorkerStockfish() {
  const url = `${chrome.runtime.getURL("lib/stockfish.js")}`;
  const blob = new Blob([`importScripts("${url}");`], {
    type: "application/javascript",
  });
  const blobUrl = URL.createObjectURL(blob);

  return new Worker(blobUrl);
}

class komodo {
  constructor({
    elo = config.elo,
    depth = config.depth,
    multipv = config.lines,
    threads = 2,
    hash = 128,
    personality = config.style,
  }) {
    this.elo = elo;
    this.depth = depth;
    this.multipv = multipv;
    this.threads = threads;
    this.hash = hash;
    this.personality = personality;
    this.ready = this.init();
  }

  async init() {
    this.worker = await createWorker();
    this.worker.postMessage("uci");
    this.setOptions();
  }

  hardStop() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }

  async restartWorker() {
    this.hardStop();
    this.worker = await createWorker();
    this.worker.postMessage("uci");
    this.setOptions();
  }

  setOptions() {
    this.worker.postMessage(
      `setoption name Personality value ${this.personality}`,
    );
    this.worker.postMessage("setoption name UCI LimitStrength value true");
    this.worker.postMessage(`setoption name UCI Elo value ${this.elo}`);
    this.worker.postMessage(`setoption name MultiPV value ${this.multipv}`);
  }

  updateConfig(lines, depth, style, elo) {
    this.depth = depth;
    this.elo = elo;
    this.personality = style;
    this.multipv = lines;
    this.worker.postMessage(`setoption name Personality value ${this.style}`);
    this.worker.postMessage(`setoption name UCI Elo value ${this.elo}`);
    this.worker.postMessage(`setoption name MultiPV value ${this.multipv}`);
  }

  async getMovesByFen(fen, side) {
    // await this.restartWorker();
    // if (this.multipv > 10) {
    //   await this.restartWorker();
    // }

    this.worker.postMessage(`setoption name Personality value ${this.style}`);
    this.worker.postMessage(`setoption name UCI Elo value ${this.elo}`);
    this.worker.postMessage(`setoption name MultiPV value ${this.multipv}`);

    const results = [];
    const seenMoves = new Set();
    const infoLines = [];
    let lastDepth = 0;
    const sideToMove = fen.split(" ")[1];

    return new Promise((resolve) => {
      const onMessage = (event) => {
        const line = event.data;
        if (debugEngine) {
          console.log(line);
        }
        //console.log(line);
        if (typeof line !== "string") return;

        /* ---------- BOOK MOVES ---------- */
        if (line.startsWith("info book move")) {
          const p = line.split(" ");
          if (p.length > 4) {
            const move = p[4];
            if (move.length >= 4 && !seenMoves.has(move)) {
              results.push({
                from: move.slice(0, 2),
                to: move.slice(2, 4),
                eval: "book",
                fen: fen,
                side: side,
              });
              seenMoves.add(move);
            }
          }
          return;
        }

        /* ---------- INFO LINES ---------- */
        if (line.startsWith("info")) {
          infoLines.push(line);

          const parts = line.split(" ");
          const depthIndex = parts.indexOf("depth");
          if (depthIndex !== -1 && depthIndex + 1 < parts.length) {
            const d = parseInt(parts[depthIndex + 1], 10);
            if (!isNaN(d)) lastDepth = d;
          }
          return;
        }

        /* ---------- END ---------- */
        if (line.startsWith("bestmove")) {
          this.worker.removeEventListener("message", onMessage);

          for (const infoLine of infoLines) {
            if (!infoLine.includes("multipv") || !infoLine.includes(" pv "))
              continue;
            if (!infoLine.includes(`depth ${lastDepth} `)) continue;

            const parts = infoLine.split(" ");

            const mpvIndex = parts.indexOf("multipv");
            const mpv = mpvIndex !== -1 ? parseInt(parts[mpvIndex + 1], 10) : 1;
            if (mpv > this.multipv) continue;

            /* ---------- SCORE ---------- */
            let evalScore = null;
            const scoreIndex = parts.indexOf("score");
            if (scoreIndex !== -1 && scoreIndex + 2 < parts.length) {
              const type = parts[scoreIndex + 1];
              let value = parseInt(parts[scoreIndex + 2], 10);

              if (!isNaN(value)) {
                if (sideToMove === "b") value = -value;

                if (type === "cp") {
                  const v = (value / 100).toFixed(2);
                  evalScore = value >= 0 ? `+${v}` : `${v}`;
                } else if (type === "mate") {
                  evalScore = `#${value}`;
                }
              }
            }

            /* ---------- MOVE ---------- */
            const pvIndex = parts.indexOf("pv");
            if (pvIndex !== -1 && pvIndex + 1 < parts.length) {
              const move = parts[pvIndex + 1];
              if (move.length >= 4 && !seenMoves.has(move)) {
                results.push({
                  from: move.slice(0, 2),
                  to: move.slice(2, 4),
                  eval: evalScore,
                  fen: fen,
                  side: side,
                });
                seenMoves.add(move);
              }
            }
          }

          resolve(results);
        }
      };

      this.worker.addEventListener("message", onMessage);

      this.worker.postMessage(`stop`);
      this.worker.postMessage(`position fen ${fen}`);
      this.worker.postMessage(`go depth ${this.depth}`);
    });
  }

  async getMovesByUCI(uciString, side, fen) {
    // if (this.multipv > 10) {
    //   await this.restartWorker();
    // }

    const results = [];
    const seenMoves = new Set();
    const infoLines = [];
    let lastDepth = 0;
    const sideToMove =
      uciString.split(" moves ")[1].trim().split(/\s+/).length % 2 === 0
        ? "w"
        : "b";

    return new Promise((resolve) => {
      const onMessage = (event) => {
        const line = event.data;
        if (debugEngine) {
          console.log(line);
        }
        if (typeof line !== "string") return;

        /* ---------- BOOK MOVES ---------- */
        if (line.startsWith("info book move")) {
          const p = line.split(" ");
          if (p.length > 4) {
            const move = p[4];
            if (move.length >= 4 && !seenMoves.has(move)) {
              results.push({
                from: move.slice(0, 2),
                to: move.slice(2, 4),
                eval: "book",
                side: side,
                fen: fen,
              });
              seenMoves.add(move);
            }
          }
          return;
        }

        /* ---------- INFO LINES ---------- */
        if (line.startsWith("info")) {
          infoLines.push(line);

          const parts = line.split(" ");
          const depthIndex = parts.indexOf("depth");
          if (depthIndex !== -1 && depthIndex + 1 < parts.length) {
            const d = parseInt(parts[depthIndex + 1], 10);
            if (!isNaN(d)) lastDepth = d;
          }
          return;
        }

        /* ---------- END ---------- */
        if (line.startsWith("bestmove")) {
          this.worker.removeEventListener("message", onMessage);

          for (const infoLine of infoLines) {
            if (!infoLine.includes("multipv") || !infoLine.includes(" pv "))
              continue;
            if (!infoLine.includes(`depth ${lastDepth} `)) continue;

            const parts = infoLine.split(" ");

            const mpvIndex = parts.indexOf("multipv");
            const mpv = mpvIndex !== -1 ? parseInt(parts[mpvIndex + 1], 10) : 1;
            if (mpv > this.multipv) continue;

            /* ---------- SCORE ---------- */
            let evalScore = null;
            const scoreIndex = parts.indexOf("score");
            if (scoreIndex !== -1 && scoreIndex + 2 < parts.length) {
              const type = parts[scoreIndex + 1];
              let value = parseInt(parts[scoreIndex + 2], 10);

              if (!isNaN(value)) {
                if (sideToMove === "b") value = -value;

                if (type === "cp") {
                  const v = (value / 100).toFixed(2);
                  evalScore = value >= 0 ? `+${v}` : `${v}`;
                } else if (type === "mate") {
                  evalScore = `#${value}`;
                }
              }
            }

            /* ---------- MOVE ---------- */
            const pvIndex = parts.indexOf("pv");
            if (pvIndex !== -1 && pvIndex + 1 < parts.length) {
              const move = parts[pvIndex + 1];
              if (move.length >= 4 && !seenMoves.has(move)) {
                results.push({
                  from: move.slice(0, 2),
                  to: move.slice(2, 4),
                  eval: evalScore,
                  side: side,
                  fen: fen,
                });
                seenMoves.add(move);
              }
            }
          }

          resolve(results);
        }
      };

      this.worker.addEventListener("message", onMessage);
      this.worker.postMessage(`stop`);
      this.worker.postMessage(`${uciString}`);
      this.worker.postMessage(`go depth ${this.depth}`);
    });
  }
}

const engine = new komodo({
  elo: config.elo,
  depth: config.depth,
  multipv: config.lines,
  threads: 2,
  hash: 128,
  personality: config.style,
});

let keyMove = {
  from: "e2",
  to: "e4",
};

function createSimpleAccuracyDisplay(
  initialWhiteAcc = 0,
  initialWhiteElo = 0,
  initialBlackAcc = 0,
  initialBlackElo = 0,
  side = "white",
) {
  // ─── Styles ───────────────────────────────────────────────────────────────

  if (!document.getElementById("acc-display-styles")) {
    const style = document.createElement("style");
    style.id = "acc-display-styles";
    style.textContent = `
      #acc-widget {
        position: fixed;
        z-index: 999999;
        top: 80px;
        left: 20px;
        display: flex;
        flex-direction: column;
        gap: 5px;
        cursor: grab;
        user-select: none;
        filter: drop-shadow(0 6px 24px rgba(0,0,0,0.28));
      }

      #acc-widget.dragging {
        cursor: grabbing;
        filter: drop-shadow(0 14px 40px rgba(0,0,0,0.45));
        transform: scale(1.015);
        transition: transform 0.12s ease, filter 0.12s ease;
      }

      /* ── Row: side indicator + pill ── */

      .acc-row {
        display: flex;
        align-items: center;
        pointer-events: none;
      }

      .acc-you-bar {
        width: 3px;
        height: 40px;
        border-radius: 2px;
        margin-right: 7px;
        flex-shrink: 0;
      }
      .acc-you-bar-white { background: #b0b0b0; }
      .acc-you-bar-black { background: #444; }

      .acc-spacer {
        width: 10px;
        flex-shrink: 0;
      }

      /* ── Pill ── */

      .acc-pill {
        display: flex;
        align-items: stretch;
        border-radius: 8px;
        width: 230px;
        overflow: hidden;
        position: relative;
      }

      .acc-pill-white {
        background: #f4f4f2;
        border: 1px solid rgba(0,0,0,0.10);
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.9);
      }

      .acc-pill-black {
        background: #18181a;
        border: 1px solid rgba(255,255,255,0.07);
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
      }

      /* Coloured left edge */
      .acc-pill::before {
        content: '';
        position: absolute;
        left: 0; top: 0; bottom: 0;
        width: 3px;
        border-radius: 8px 0 0 8px;
        z-index: 2;
      }
      .acc-pill-white::before { background: linear-gradient(180deg, #c8c8c8, #888); }
      .acc-pill-black::before { background: linear-gradient(180deg, #555, #1e1e1e); }

      /* ── Segments ── */

      .acc-segment {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 10px 12px 10px 16px;
        flex: 1;
        position: relative;
        z-index: 1;
      }

      .acc-segment-elo {
        flex: 0.85;
        border-left-width: 1px;
        border-left-style: solid;
      }
      .acc-pill-white .acc-segment-elo { border-left-color: rgba(0,0,0,0.08); }
      .acc-pill-black .acc-segment-elo { border-left-color: rgba(255,255,255,0.07); }

      /* ── Labels & values ── */

      .acc-label {
        font-family: ui-monospace, 'Cascadia Code', 'Courier New', monospace;
        font-size: 8.5px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.14em;
        margin-bottom: 4px;
      }
      .acc-pill-white .acc-label { color: #aaa; }
      .acc-pill-black .acc-label { color: #4a4a4a; }

      .acc-value {
        font-family: ui-monospace, 'Cascadia Code', 'Courier New', monospace;
        font-size: 16px;
        font-weight: 500;
        letter-spacing: -0.02em;
        line-height: 1;
      }
      .acc-pill-white .acc-value { color: #111; }
      .acc-pill-black .acc-value { color: #e8e8e8; }

      /* ── Update flash ── */

      @keyframes acc-flash {
        0%   { opacity: 0.35; }
        100% { opacity: 1; }
      }
      .acc-pill.updated {
        animation: acc-flash 0.3s ease-out forwards;
      }
    `;
    document.head.appendChild(style);
  }

  // ─── HTML builder ─────────────────────────────────────────────────────────

  function rowHTML(acc, elo, color, isYou) {
    const left = isYou
      ? `<div class="acc-you-bar acc-you-bar-${color}"></div>`
      : `<div class="acc-spacer"></div>`;

    return `
      <div class="acc-row">
        ${left}
        <div class="acc-pill acc-pill-${color}" id="acc-pill-${color}">
          <div class="acc-segment acc-segment-acc">
            <span class="acc-label">Accuracy</span>
            <span class="acc-value">${acc}%</span>
          </div>
          <div class="acc-segment acc-segment-elo">
            <span class="acc-label">Elo Estimation</span>
            <span class="acc-value">${elo || "—"}</span>
          </div>
        </div>
      </div>
    `;
  }

  // ─── Widget mount ─────────────────────────────────────────────────────────

  const widget = document.createElement("div");
  widget.id = "acc-widget";
  document.body.appendChild(widget);

  chrome.storage.local.get("accWidgetPos", (result) => {
    if (result.accWidgetPos) {
      widget.style.left = result.accWidgetPos.left;
      widget.style.top = result.accWidgetPos.top;
    }
  });

  // ─── Drag ─────────────────────────────────────────────────────────────────

  let isDragging = false;
  let offsetX = 0,
    offsetY = 0;

  widget.addEventListener("mousedown", (e) => {
    isDragging = true;
    widget.classList.add("dragging");
    offsetX = e.clientX - widget.getBoundingClientRect().left;
    offsetY = e.clientY - widget.getBoundingClientRect().top;
    e.preventDefault();
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    widget.style.left = `${e.clientX - offsetX}px`;
    widget.style.top = `${e.clientY - offsetY}px`;
  });

  document.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    widget.classList.remove("dragging");
    chrome.storage.local.set({
      accWidgetPos: { left: widget.style.left, top: widget.style.top },
    });
  });

  // ─── Flash helper ─────────────────────────────────────────────────────────

  function flashPill(color) {
    const pill = document.getElementById(`acc-pill-${color}`);
    if (!pill) return;
    pill.classList.remove("updated");
    void pill.offsetWidth; // force reflow to restart animation
    pill.classList.add("updated");
  }

  // ─── Update ───────────────────────────────────────────────────────────────

  function update(whiteAcc, whiteElo, blackAcc, blackElo, newSide) {
    if (newSide !== undefined) side = newSide;

    if (side === "white") {
      widget.innerHTML =
        rowHTML(blackAcc, blackElo, "black", false) +
        rowHTML(whiteAcc, whiteElo, "white", true);
    } else {
      widget.innerHTML =
        rowHTML(whiteAcc, whiteElo, "white", false) +
        rowHTML(blackAcc, blackElo, "black", true);
    }

    flashPill("white");
    flashPill("black");
  }

  update(initialWhiteAcc, initialWhiteElo, initialBlackAcc, initialBlackElo);
  return { update };
}

const startCheat = () => {
  if (window.location.host === "www.chess.com") {
    let lastFEN = "";
    let isGameOver = false;
    let fen_ = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    let side_index = 1;
    let evalObj = null;
    let chessComFenHistory = [];
    let statObj = null;

    function getElo(side) {
      const players = document.querySelectorAll(".player-playerContent");
      if (players.length < 2) return null;

      const extractElo = (text) => {
        const match = text.match(/\((\d+)\)/);
        return match ? parseInt(match[1], 10) : null;
      };

      const topElo = extractElo(players[0].innerText);
      const bottomElo = extractElo(players[1].innerText);

      if (side.toLowerCase() === "white") {
        return { white: bottomElo, black: topElo };
      } else if (side.toLowerCase() === "black") {
        return { white: topElo, black: bottomElo };
      } else {
        return null;
      }
    }

    function createEvalBar(initialScore = "0.0", initialColor = "white") {
      const boardContainer = document.querySelector(".board");
      let w_ = boardContainer.offsetWidth;

      if (!boardContainer) return console.error("Plateau non trouvé !");

      // Conteneur principal
      const evalContainer = document.createElement("div");
      evalContainer.id = "customEval";
      evalContainer.style.zIndex = "9999";
      evalContainer.style.width = `${(w_ * 6) / 100}px`;
      evalContainer.style.height = `${boardContainer.offsetWidth}px`;
      evalContainer.style.background = "#eee";
      evalContainer.style.marginLeft = "10px";
      evalContainer.style.position = "relative";
      evalContainer.style.border = "1px solid #aaa";
      evalContainer.style.borderRadius = "4px";
      evalContainer.style.overflow = "hidden";

      const topBar = document.createElement("div");
      const bottomBar = document.createElement("div");

      [topBar, bottomBar].forEach((bar) => {
        bar.style.width = "100%";
        bar.style.position = "absolute";
        bar.style.transition = "height 0.3s ease";
      });

      topBar.style.top = "0";
      bottomBar.style.bottom = "0";

      evalContainer.appendChild(topBar);
      evalContainer.appendChild(bottomBar);
      // Texte en bas
      const scoreText = document.createElement("div");
      scoreText.style.position = "absolute";
      scoreText.style.bottom = "0";
      scoreText.style.left = "50%";
      scoreText.style.transform = "translateX(-50%)";
      scoreText.style.color = "red";
      scoreText.style.fontWeight = "bold";
      scoreText.style.fontSize = "12px";
      scoreText.style.pointerEvents = "none";
      evalContainer.appendChild(scoreText);

      boardContainer.parentNode.style.display = "flex";
      // boardContainer.parentNode.appendChild(evalContainer);
      boardContainer.parentNode.insertBefore(evalContainer, boardContainer);

      function parseScore(scoreStr) {
        if (!scoreStr) {
          return { score: 0, mate: false };
        }

        scoreStr = scoreStr.trim();
        let mate = false;
        let score = 0;

        if (scoreStr.startsWith("#")) {
          mate = true;
          scoreStr = scoreStr.slice(1);
        }

        score = parseFloat(scoreStr.replace("+", "")) || 0;
        return { score, mate };
      }

      function update(scoreStr, color = "white") {
        let { score, mate } = parseScore(scoreStr);

        let percent = 50;

        if (mate) {
          let sign = score > 0 ? "+" : "-";
          scoreText.textContent = "#" + sign + Math.abs(score);
          if (
            (score > 0 && color === "white") ||
            (score < 0 && color === "black")
          ) {
            percent = 100;
          } else {
            percent = 0;
          }
        } else {
          let sign = score > 0 ? "+" : "";
          scoreText.textContent = sign + score.toFixed(1);
          if (color === "black") score = -score;
          if (score >= 7) {
            percent = 90;
          } else if (score <= -7) {
            percent = 10;
          } else {
            percent = 50 + (score / 7) * 40;
          }
        }

        if (color === "white") {
          bottomBar.style.background = "#ffffff";
          topBar.style.background = "#312e2b";
        } else {
          bottomBar.style.background = "#312e2b";
          topBar.style.background = "#ffffff";
        }

        bottomBar.style.height = percent + "%";
        topBar.style.height = 100 - percent + "%";
      }

      update(initialScore, initialColor);
      return { update };
    }

    function inject() {
      window.addEventListener("message", (event) => {
        if (event.source !== window) return;
        if (event.data && event.data.type === "FEN_RESPONSE") {
          fen_ = event.data.fen;
          side_index = event.data.side_;
          isGameOver = event.data.isGameOver;
          chessComFenHistory = event.data.fenHistory;
        }
      });
    }
    inject();

    function requestFen() {
      window.postMessage({ type: "GET_FEN" }, "*");
    }
    function requestMove(from, to, promotion = "q", key = false) {
      key ? (moveDelay = 0) : (moveDelay = randomIntBetween(100, config.delay));
      window.postMessage(
        {
          type: "MOVE",
          from,
          to,
          promotion,
          moveDelay,
        },
        "*",
      );
    }

    function highlightMovesOnBoard(moves, side) {
      // console.log(side);
      if (!Array.isArray(moves)) return;
      if (config.onlyShowEval) return;

      const parent = document.querySelector("wc-chess-board");
      if (!parent) return;

      const squareSize = parent.offsetWidth / 8;
      const maxMoves = 5;
      let colors = config.colors;

      parent.querySelectorAll(".customH").forEach((el) => el.remove());

      function squareToPosition(square) {
        const fileChar = square[0];
        const rankChar = square[1];
        const rank = parseInt(rankChar, 10) - 1;

        let file;
        if (side === "w") {
          file = fileChar.charCodeAt(0) - "a".charCodeAt(0);
          const y = (7 - rank) * squareSize;
          const x = file * squareSize;
          return { x, y };
        } else {
          file = "h".charCodeAt(0) - fileChar.charCodeAt(0);
          const y = rank * squareSize;
          const x = file * squareSize;
          return { x, y };
        }
      }

      function drawArrow(fromSquare, toSquare, color, score) {
        const from = squareToPosition(fromSquare);
        const to = squareToPosition(toSquare);

        const svg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg",
        );
        svg.setAttribute("class", "customH");
        svg.setAttribute("width", parent.offsetWidth);
        svg.setAttribute("height", parent.offsetWidth);
        svg.style.position = "absolute";
        svg.style.left = "0";
        svg.style.top = "0";
        svg.style.pointerEvents = "none";
        svg.style.overflow = "visible";
        svg.style.zIndex = "10";

        const defs = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "defs",
        );
        const marker = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "marker",
        );
        marker.setAttribute("id", `arrowhead-${color}`);
        marker.setAttribute("markerWidth", "3.5");
        marker.setAttribute("markerHeight", "2.5");
        marker.setAttribute("refX", "1.75");
        marker.setAttribute("refY", "1.25");
        marker.setAttribute("orient", "auto");
        marker.setAttribute("markerUnits", "strokeWidth");

        const arrowPath = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path",
        );
        arrowPath.setAttribute("d", "M0,0 L3.5,1.25 L0,2.5 Z");
        arrowPath.setAttribute("fill", color);
        marker.appendChild(arrowPath);
        defs.appendChild(marker);
        svg.appendChild(defs);

        const line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line",
        );
        line.setAttribute("x1", from.x + squareSize / 2);
        line.setAttribute("y1", from.y + squareSize / 2);
        line.setAttribute("x2", to.x + squareSize / 2);
        line.setAttribute("y2", to.y + squareSize / 2);
        line.setAttribute("stroke", color);
        line.setAttribute("stroke-width", "5");
        line.setAttribute("marker-end", `url(#arrowhead-${color})`);
        line.setAttribute("opacity", "0.6");
        svg.appendChild(line);

        if (score !== undefined) {
          const group = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "g",
          );

          const text = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text",
          );

          text.setAttribute("x", to.x + squareSize);
          text.setAttribute("y", to.y);
          text.setAttribute("font-size", "9");
          text.setAttribute("font-weight", "bold");
          text.setAttribute("text-anchor", "middle");
          text.setAttribute("dominant-baseline", "middle");
          text.setAttribute("fill", color);

          let isNegative = false;
          let displayScore = score;

          const hasHash = score.startsWith("#");
          let raw = hasHash ? score.slice(1) : score;

          if (raw.startsWith("-")) {
            isNegative = true;
            raw = raw.slice(1);
          } else if (raw.startsWith("+")) {
            raw = raw.slice(1);
          }

          displayScore = hasHash ? "#" + raw : raw;
          text.textContent = displayScore;

          group.appendChild(text);
          svg.appendChild(group);

          requestAnimationFrame(() => {
            const bbox = text.getBBox();

            const paddingX = 2;
            const paddingY = 2;

            const rect = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "rect",
            );

            rect.setAttribute("x", bbox.x - paddingX);
            rect.setAttribute("y", bbox.y - paddingY);
            rect.setAttribute("width", bbox.width + paddingX * 2);
            rect.setAttribute("height", bbox.height + paddingY * 2);

            rect.setAttribute("rx", "8");
            rect.setAttribute("ry", "8");

            rect.setAttribute("fill", isNegative ? "#312e2b" : "#ffffff");
            rect.setAttribute("fill-opacity", "0.85");
            rect.setAttribute("stroke", isNegative ? "#000000" : "#cccccc");
            rect.setAttribute("stroke-width", "1");

            group.insertBefore(rect, text);
          });
        }

        parent.appendChild(svg);
      }

      parent.style.position = "relative";

      let filteredMoves = moves;
      if (config.winningMove) {
        filteredMoves = moves.filter((move) => {
          const evalValue = parseFloat(move.eval);
          if (side === "w") {
            return (
              evalValue >= 2 ||
              (move.eval.startsWith("#") && parseInt(move.eval.slice(1)) > 0)
            );
          } else {
            return (
              evalValue <= -2 ||
              (move.eval.startsWith("#-") && parseInt(move.eval.slice(2)) > 0)
            );
          }
        });
      }

      filteredMoves.slice(0, maxMoves).forEach((move, index) => {
        const color = colors[index] || "red";
        drawArrow(move.from, move.to, color, move.eval);
      });
    }

    function getSide() {
      return side_index === 1 ? "white" : "black";
    }

    // key press
    window.onkeyup = (e) => {
      if (e.key === config.key) {
        requestMove(keyMove.from, keyMove.to, "q", true);
      }
    };

    async function checkAndSendMoves() {
      requestFen();

      if (!config.showEval && document.querySelector("#customEval")) {
        document.querySelector("#customEval").remove();
        evalObj = null;
      }

      if (!document.querySelector("#customEval") && config.showEval) {
        const boardContainer = document.querySelector(".board");
        if (boardContainer) {
          evalObj = createEvalBar("0.0", getSide());
        }
      }

      if (config.stat && !document.querySelector("#acc-widget")) {
        statObj = createSimpleAccuracyDisplay(100, 1500, 100, 1500, getSide());
      }

      if (!config.stat && document.querySelector("#acc-widget")) {
        statObj = null;
        document.querySelector("#acc-widget").remove();
      }

      if (lastFEN !== fen_) { 
        //accuracy
        const whiteElo = getElo(getSide())?.white || null
        const blackElo = getElo(getSide())?.black || null

        if (config.stat && statObj) {  
          const result = await analyzer.update(chessComFenHistory, {whiteElo : whiteElo , blackElo : blackElo});
          statObj.update(
            result.white.accuracy,
            result.white.elo,
            result.black.accuracy,
            result.black.elo,
            getSide(),
          );
        }

        //
        clearHighlightSquares();
        if (
          (getSide()[0] === "w" && fen_.split(" ")[1] === "w") ||
          (getSide()[0] === "b" && fen_.split(" ")[1] === "b")
        ) {
          lastFEN = fen_;
          engine.getMovesByFen(fen_, getSide()).then((moves) => {
            chrome.runtime.sendMessage({ type: "FROM_CONTENT", data: moves });
            keyMove.from = moves[0].from;
            keyMove.to = moves[0].to;
            if (config.autoMove) {
              requestMove(moves[0].from, moves[0].to);
            }
            if (moves.length > 0 && evalObj) {
              evalObj.update(moves[0].eval, getSide());
            }
            highlightMovesOnBoard(moves, getSide()[0]);
          });
        }
      }
    }

    setInterval(checkAndSendMoves, interval);

    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === "local" && changes.chessConfig) {
        const newConfig = changes.chessConfig.newValue;
        config = newConfig;
        engine.updateConfig(
          config.lines,
          config.depth,
          config.style,
          config.elo + 700,
        );
      }
    });
  }

  if (window.location.host === "lichess.org") {
    chrome.runtime.sendMessage({ type: "ATTACH_DEBUGGER" }, (res) => {
      if (res?.success) {
        let ok = true;
      }
    });
    let fen_ = "";
    let evalObj = null;
    let statObj = null;
    let lichessFenHistory = [];

    function getElo(side) {
      const ratings = document.querySelectorAll("rating");
      if (ratings.length < 2) return null;

      const topElo = parseInt(ratings[0].innerText, 10);
      const bottomElo = parseInt(ratings[1].innerText, 10);

      if (side.toLowerCase() === "white") {
        return { white: bottomElo, black: topElo };
      } else if (side.toLowerCase() === "black") {
        return { white: topElo, black: bottomElo };
      } else {
        return null;
      }
    }

    function createEvalBar(initialScore = "0.0", initialColor = "white") {
      const boardContainer = document.querySelector("cg-board");
      let w_ = boardContainer.offsetWidth;

      if (!boardContainer) return console.error("Plateau non trouvé !");

      // Conteneur principal
      const evalContainer = document.createElement("div");
      evalContainer.id = "customEval";
      evalContainer.style.zIndex = "9999";
      evalContainer.style.width = `${(w_ * 6) / 100}px`;
      evalContainer.style.height = `${boardContainer.offsetWidth}px`;
      evalContainer.style.background = "#eee";
      evalContainer.style.marginLeft = "10px";
      evalContainer.style.position = "relative";
      evalContainer.style.left = "-50px";
      evalContainer.style.border = "1px solid #aaa";
      evalContainer.style.borderRadius = "4px";
      evalContainer.style.overflow = "hidden";

      const topBar = document.createElement("div");
      const bottomBar = document.createElement("div");

      [topBar, bottomBar].forEach((bar) => {
        bar.style.width = "100%";
        bar.style.position = "absolute";
        bar.style.transition = "height 0.3s ease";
      });

      topBar.style.top = "0";
      bottomBar.style.bottom = "0";

      evalContainer.appendChild(topBar);
      evalContainer.appendChild(bottomBar);

      // Texte en bas
      const scoreText = document.createElement("div");
      scoreText.style.position = "absolute";
      scoreText.style.bottom = "0";
      scoreText.style.left = "50%";
      scoreText.style.transform = "translateX(-50%)";
      scoreText.style.color = "red";
      scoreText.style.fontWeight = "bold";
      scoreText.style.fontSize = "12px";
      scoreText.style.pointerEvents = "none";
      evalContainer.appendChild(scoreText);

      boardContainer.parentNode.style.display = "flex";
      // boardContainer.parentNode.appendChild(evalContainer);
      boardContainer.parentNode.insertBefore(evalContainer, boardContainer);

      function parseScore(scoreStr) {
        if (!scoreStr) {
          return { score: 0, mate: false };
        }

        scoreStr = scoreStr.trim();
        let mate = false;
        let score = 0;

        if (scoreStr.startsWith("#")) {
          mate = true;
          scoreStr = scoreStr.slice(1);
        }

        score = parseFloat(scoreStr.replace("+", "")) || 0;
        return { score, mate };
      }

      function update(scoreStr, color = "white") {
        let { score, mate } = parseScore(scoreStr);
        let percent = 50;

        if (mate) {
          let sign = score > 0 ? "+" : "-";
          scoreText.textContent = "#" + sign + Math.abs(score);
          if (
            (score > 0 && color === "white") ||
            (score < 0 && color === "black")
          ) {
            percent = 100;
          } else {
            percent = 0;
          }
        } else {
          let sign = score > 0 ? "+" : "";
          scoreText.textContent = sign + score.toFixed(1);
          if (color === "black") score = -score;
          if (score >= 7) {
            percent = 90;
          } else if (score <= -7) {
            percent = 10;
          } else {
            percent = 50 + (score / 7) * 40;
          }
        }

        if (color === "white") {
          bottomBar.style.background = "#ffffff";
          topBar.style.background = "#312e2b";
        } else {
          bottomBar.style.background = "#312e2b";
          topBar.style.background = "#ffffff";
        }

        bottomBar.style.height = percent + "%";
        topBar.style.height = 100 - percent + "%";
      }

      update(initialScore, initialColor);
      return { update };
    }

    function highlightMovesOnBoard(moves, side) {
      if (!Array.isArray(moves)) return;

      if (config.onlyShowEval) return;

      const parent = document.querySelector("cg-container");
      if (!parent) return;

      const squareSize = parent.offsetWidth / 8;
      const maxMoves = 5;
      let colors = config.colors;

      parent.querySelectorAll(".customH").forEach((el) => el.remove());

      function squareToPosition(square) {
        const fileChar = square[0];
        const rankChar = square[1];
        const rank = parseInt(rankChar, 10) - 1;

        let file;
        if (side === "w") {
          file = fileChar.charCodeAt(0) - "a".charCodeAt(0);
          const y = (7 - rank) * squareSize;
          const x = file * squareSize;
          return { x, y };
        } else {
          file = "h".charCodeAt(0) - fileChar.charCodeAt(0);
          const y = rank * squareSize;
          const x = file * squareSize;
          // console.log({x : x, y: y})
          return { x, y };
        }
      }

      function drawArrow(fromSquare, toSquare, color, score) {
        const from = squareToPosition(fromSquare);
        const to = squareToPosition(toSquare);

        const svg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg",
        );
        svg.setAttribute("class", "customH");
        svg.setAttribute("width", parent.offsetWidth);
        svg.setAttribute("height", parent.offsetWidth);
        svg.style.position = "absolute";
        svg.style.left = "0";
        svg.style.top = "0";
        svg.style.pointerEvents = "none";
        svg.style.overflow = "visible";
        svg.style.zIndex = "10";

        const defs = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "defs",
        );
        const marker = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "marker",
        );
        marker.setAttribute("id", `arrowhead-${color}`);
        marker.setAttribute("markerWidth", "3.5");
        marker.setAttribute("markerHeight", "2.5");
        marker.setAttribute("refX", "1.75");
        marker.setAttribute("refY", "1.25");
        marker.setAttribute("orient", "auto");
        marker.setAttribute("markerUnits", "strokeWidth");

        const arrowPath = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path",
        );
        arrowPath.setAttribute("d", "M0,0 L3.5,1.25 L0,2.5 Z");
        arrowPath.setAttribute("fill", color);
        marker.appendChild(arrowPath);
        defs.appendChild(marker);
        svg.appendChild(defs);

        const line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line",
        );
        line.setAttribute("x1", from.x + squareSize / 2);
        line.setAttribute("y1", from.y + squareSize / 2);
        line.setAttribute("x2", to.x + squareSize / 2);
        line.setAttribute("y2", to.y + squareSize / 2);
        line.setAttribute("stroke", color);
        line.setAttribute("stroke-width", "5");
        line.setAttribute("marker-end", `url(#arrowhead-${color})`);
        line.setAttribute("opacity", "0.6");
        svg.appendChild(line);

        if (score !== undefined) {
          const group = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "g",
          );

          const text = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text",
          );

          text.setAttribute("x", to.x + squareSize);
          text.setAttribute("y", to.y);
          text.setAttribute("font-size", "9");
          text.setAttribute("font-weight", "bold");
          text.setAttribute("text-anchor", "middle");
          text.setAttribute("dominant-baseline", "middle");
          text.setAttribute("fill", color);

          let isNegative = false;
          let displayScore = score;

          const hasHash = score.startsWith("#");
          let raw = hasHash ? score.slice(1) : score;

          if (raw.startsWith("-")) {
            isNegative = true;
            raw = raw.slice(1);
          } else if (raw.startsWith("+")) {
            raw = raw.slice(1);
          }

          displayScore = hasHash ? "#" + raw : raw;
          text.textContent = displayScore;

          group.appendChild(text);
          svg.appendChild(group);

          requestAnimationFrame(() => {
            const bbox = text.getBBox();

            const paddingX = 2;
            const paddingY = 2;

            const rect = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "rect",
            );

            rect.setAttribute("x", bbox.x - paddingX);
            rect.setAttribute("y", bbox.y - paddingY);
            rect.setAttribute("width", bbox.width + paddingX * 2);
            rect.setAttribute("height", bbox.height + paddingY * 2);

            rect.setAttribute("rx", "8");
            rect.setAttribute("ry", "8");

            rect.setAttribute("fill", isNegative ? "#312e2b" : "#ffffff");
            rect.setAttribute("fill-opacity", "0.85");
            rect.setAttribute("stroke", isNegative ? "#000000" : "#cccccc");
            rect.setAttribute("stroke-width", "1");

            group.insertBefore(rect, text);
          });
        }

        parent.appendChild(svg);
      }

      parent.style.position = "relative";

      let filteredMoves = moves;
      if (config.winningMove) {
        filteredMoves = moves.filter((move) => {
          const evalValue = parseFloat(move.eval);
          if (side === "w") {
            return (
              evalValue >= 2 ||
              (move.eval.startsWith("#") && parseInt(move.eval.slice(1)) > 0)
            );
          } else {
            return (
              evalValue <= -2 ||
              (move.eval.startsWith("#-") && parseInt(move.eval.slice(2)) > 0)
            );
          }
        });
      }

      filteredMoves.slice(0, maxMoves).forEach((move, index) => {
        const color = colors[index] || "red";
        // drawArrow(move.from, move.to, color, move.eval);
        drawArrow(move.from, move.to, color, move.eval);
      });

      // console.log(fen_)
    }

    function getSide() {
      const board = document.querySelector(".cg-wrap");
      if (!board) return "white"; // si le plateau n'est pas trouvé

      if (board.classList.contains("orientation-black")) {
        return "black";
      } else if (board.classList.contains("orientation-white")) {
        return "white";
      } else {
        return "white";
      }
    }

    function requestFen() {
      // console.log("request fen called");
      window.postMessage({ type: "FEN" }, "*");
    }

    async function movePiece(from, to, delay) {
      const fromSquare = from;
      const toSquare = to;
      const moveDelay = delay;

      const board = document.querySelector("cg-board");
      const rect = board.getBoundingClientRect();

      const boardInfo = {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      };

      chrome.runtime.sendMessage({ type: "BOARD_INFO", boardInfo });
      const coordFrom = squareToPixels(fromSquare, boardInfo, getSide());
      const coordTo = squareToPixels(toSquare, boardInfo, getSide());

      await sleep(moveDelay);

      chrome.runtime.sendMessage({
        type: "DRAG_MOVE",
        fromX: coordFrom.x,
        fromY: coordFrom.y,
        toX: coordTo.x,
        toY: coordTo.y,
      });
    }

    window.onkeyup = async (e) => {
      if (e.key === config.key) {
        await movePiece(keyMove.from, keyMove.to, 0);
      }
    };

    /////////////////////////////////////////////   calculation /////////////////////////////////////////////
    function inject() {
      window.addEventListener("message", (event) => {
        if (config.stat && !document.querySelector("#acc-widget")) {
          statObj = createSimpleAccuracyDisplay(
            100,
            1500,
            100,
            1500,
            getSide(),
          );
        }

        if (!config.stat && document.querySelector("#acc-widget")) {
          statObj = null;
          document.querySelector("#acc-widget").remove();
        }

        if (event.source !== window) return;
        if (event.data && event.data.type === "FEN_RESPONSE") {
          if (event.data.fen !== fen_) {
            clearHighlightSquares();
            if (
              (getSide()[0] === "w" && event.data.fen.split(" ")[1] === "w") ||
              (getSide()[0] === "b" && event.data.fen.split(" ")[1] === "b")
            ) {
              fen_ = event.data.fen;
              engine.getMovesByFen(fen_, getSide()).then(async (moves) => {
                highlightMovesOnBoard(moves, getSide()[0]);
                keyMove.from = moves[0].from;
                keyMove.to = moves[0].to;
                if (moves.length > 0 && evalObj) {
                  evalObj.update(moves[0].eval, getSide());
                }

                if (moves.length > 0 && config.autoMove) {
                  await movePiece(
                    moves[0].from,
                    moves[0].to,
                    randomIntBetween(0, config.delay),
                  );
                }

                chrome.runtime.sendMessage({
                  type: "FROM_CONTENT",
                  data: moves,
                });
              });
            }
          }
        }
      });
    }

    inject();

    setInterval(() => {
      if (!config.showEval && document.querySelector("#customEval")) {
        document.querySelector("#customEval").remove();
        // customEval = null;
        evalObj = null;
      }

      if (!document.querySelector("#customEval") && config.showEval) {
        const boardContainer = document.querySelector("cg-container");
        if (boardContainer) {
          evalObj = createEvalBar("0.0", getSide());
          // customEval = document.querySelector("#customEval");
        }
      }

      requestFen();
    }, interval);

    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === "local" && changes.chessConfig) {
        const newConfig = changes.chessConfig.newValue;
        config = newConfig;
        engine.updateConfig(
          config.lines,
          config.depth,
          config.style,
          config.elo + 700,
        );
      }
    });

    chrome.runtime.onMessage.addListener(async (message, sender) => {
      if (message.type === "history") {
        
        const whiteElo = getElo(getSide())?.white || null
        const blackElo = getElo(getSide())?.black || null

        if (config.stat && statObj) {
          lichessFenHistory = message.data;
          const result = await analyzer.update(lichessFenHistory, {whiteElo : whiteElo , blackElo : blackElo});
          statObj.update(
            result.white.accuracy,
            result.white.elo,
            result.black.accuracy,
            result.black.elo,
            getSide(),
          );
        }
      }
    });
  }

  if (window.location.host === "worldchess.com") {
    chrome.runtime.sendMessage({ type: "ATTACH_DEBUGGER" }, (res) => {
      if (res?.success) {
        console.log("Debugger ready");
      }
    });
    let fen_ = "";
    let currentFen = "";
    let evalObj = null;
    let statObj = null;

    function getElo(side) {
      const allPlayerInfo = document.querySelectorAll(
        '[data-component="GamePlayerInfo"]',
      );
      if (allPlayerInfo.length < 2) return null;

      const extractElo = (text) => {
        const match = text.match(/\n(\d+)$/); // prend le nombre après le \n
        return match ? parseInt(match[1], 10) : null;
      };

      const topElo = extractElo(allPlayerInfo[0].innerText);
      const bottomElo = extractElo(allPlayerInfo[1].innerText);

      if (side.toLowerCase() === "white") {
        return { white: bottomElo, black: topElo };
      } else if (side.toLowerCase() === "black") {
        return { white: topElo, black: bottomElo };
      } else {
        return null;
      }
    }

    function getFEN() {
      const pTags = document.querySelectorAll("p");
      const result = [];

      const fenRegex =
        /^([rnbqkpRNBQKP1-8]+\/){7}[rnbqkpRNBQKP1-8]+\s[wb]\s(K?Q?k?q?-?)\s(-|[a-h][36])\s\d+\s\d+$/;

      pTags.forEach((p) => {
        const text = p.textContent.trim();
        if (fenRegex.test(text)) {
          result.push(text);
        }
      });

      return result[0];
    }

    function getSide() {
      const cgBoard = document.querySelector("cg-board");
      let side = "white";

      if (cgBoard) {
        const indicator = cgBoard.style.transform; // "rotate(180)"
        if (indicator === "rotate(180deg)") {
          side = "black";
        }
        if (indicator === "rotate(0deg)") {
          side = "white";
        }
      }

      // console.log("Getside called")
      // console.log("side")

      // console.log(side)

      return side;
    }

    function highlightMovesOnBoard(moves, side) {
      // console.log(side);
      if (!Array.isArray(moves)) return;

      // Si onlyShowEval est activé, on n'affiche rien
      if (config.onlyShowEval) return;

      const parent = document.querySelector("cg-board");

      if (!parent) return;

      const squareSize = parent.offsetWidth / 8;
      const maxMoves = 5;
      let colors = config.colors;

      // parent.querySelectorAll(".customH").forEach((el) => el.remove());

      function squareToPosition(square) {
        const fileChar = square[0];
        const rankChar = square[1];
        const rank = parseInt(rankChar, 10) - 1;

        let file;
        if (side === "w") {
          file = fileChar.charCodeAt(0) - "a".charCodeAt(0);
          const y = (7 - rank) * squareSize;
          const x = file * squareSize;
          return { x, y };
        } else {
          file = "h".charCodeAt(0) - fileChar.charCodeAt(0);
          const y = rank * squareSize;
          const x = file * squareSize;
          return { x, y };
        }
      }

      function drawArrow(fromSquare, toSquare, color, score) {
        const from = squareToPosition(fromSquare);
        const to = squareToPosition(toSquare);

        const svg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg",
        );
        svg.setAttribute("class", "customH");
        svg.setAttribute("width", parent.offsetWidth);
        svg.setAttribute("height", parent.offsetWidth);
        svg.style.position = "absolute";
        svg.style.left = "0";
        svg.style.top = "0";
        svg.style.pointerEvents = "none";
        svg.style.overflow = "visible";
        svg.style.zIndex = "10";

        const defs = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "defs",
        );
        const marker = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "marker",
        );
        marker.setAttribute("id", `arrowhead-${color}`);
        marker.setAttribute("markerWidth", "3.5");
        marker.setAttribute("markerHeight", "2.5");
        marker.setAttribute("refX", "1.75");
        marker.setAttribute("refY", "1.25");
        marker.setAttribute("orient", "auto");
        marker.setAttribute("markerUnits", "strokeWidth");

        const arrowPath = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path",
        );
        arrowPath.setAttribute("d", "M0,0 L3.5,1.25 L0,2.5 Z");
        arrowPath.setAttribute("fill", color);
        marker.appendChild(arrowPath);
        defs.appendChild(marker);
        svg.appendChild(defs);

        const line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line",
        );
        line.setAttribute("x1", from.x + squareSize / 2);
        line.setAttribute("y1", from.y + squareSize / 2);
        line.setAttribute("x2", to.x + squareSize / 2);
        line.setAttribute("y2", to.y + squareSize / 2);
        line.setAttribute("stroke", color);
        line.setAttribute("stroke-width", "5");
        line.setAttribute("marker-end", `url(#arrowhead-${color})`);
        line.setAttribute("opacity", "0.6");
        svg.appendChild(line);

        if (score !== undefined) {
          const group = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "g",
          );

          const text = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text",
          );

          text.setAttribute("x", to.x + squareSize);
          text.setAttribute("y", to.y);
          text.setAttribute("font-size", "9");
          text.setAttribute("font-weight", "bold");
          text.setAttribute("text-anchor", "middle");
          text.setAttribute("dominant-baseline", "middle");
          text.setAttribute("fill", color);

          let isNegative = false;
          let displayScore = score;

          const hasHash = score.startsWith("#");
          let raw = hasHash ? score.slice(1) : score;

          if (raw.startsWith("-")) {
            isNegative = true;
            raw = raw.slice(1);
          } else if (raw.startsWith("+")) {
            raw = raw.slice(1);
          }

          displayScore = hasHash ? "#" + raw : raw;
          text.textContent = displayScore;

          group.appendChild(text);
          svg.appendChild(group);

          requestAnimationFrame(() => {
            const bbox = text.getBBox();

            const paddingX = 2;
            const paddingY = 2;

            const rect = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "rect",
            );

            rect.setAttribute("x", bbox.x - paddingX);
            rect.setAttribute("y", bbox.y - paddingY);
            rect.setAttribute("width", bbox.width + paddingX * 2);
            rect.setAttribute("height", bbox.height + paddingY * 2);

            rect.setAttribute("rx", "8");
            rect.setAttribute("ry", "8");

            rect.setAttribute("fill", isNegative ? "#312e2b" : "#ffffff");
            rect.setAttribute("fill-opacity", "0.85");
            rect.setAttribute("stroke", isNegative ? "#000000" : "#cccccc");
            rect.setAttribute("stroke-width", "1");

            group.insertBefore(rect, text);
          });
        }

        parent.appendChild(svg);
      }

      parent.style.position = "relative";

      let filteredMoves = moves;
      if (config.winningMove) {
        filteredMoves = moves.filter((move) => {
          const evalValue = parseFloat(move.eval);
          if (side === "w") {
            return (
              evalValue >= 2 ||
              (move.eval.startsWith("#") && parseInt(move.eval.slice(1)) > 0)
            );
          } else {
            return (
              evalValue <= -2 ||
              (move.eval.startsWith("#-") && parseInt(move.eval.slice(2)) > 0)
            );
          }
        });
      }

      filteredMoves.slice(0, maxMoves).forEach((move, index) => {
        const color = colors[index] || "red";
        // drawArrow(move.from, move.to, color, move.eval);
        drawArrow(move.from, move.to, color, move.eval);
        if (side === "b") {
          document
            .querySelectorAll(".customH")
            .forEach((el) => (el.style.transform = "rotate(180deg)"));
        }
      });
    }

    function createEvalBar(initialScore = "0.0", initialColor = "white") {
      const boardContainer = document.querySelector("cg-board");

      if (!boardContainer) return console.error("Plateau non trouvé !");
      let w_ = boardContainer.offsetWidth;
      // Conteneur principal
      const evalContainer = document.createElement("div");
      evalContainer.id = "customEval";
      evalContainer.style.zIndex = "9999";
      evalContainer.style.width = `${(w_ * 6) / 100}px`;
      evalContainer.style.height = `${boardContainer.offsetWidth}px`;
      evalContainer.style.background = "#eee";
      evalContainer.style.marginLeft = "10px";
      evalContainer.style.position = "relative";
      evalContainer.style.left = "-10px";
      evalContainer.style.border = "1px solid #aaa";
      evalContainer.style.borderRadius = "4px";
      evalContainer.style.overflow = "hidden";

      const topBar = document.createElement("div");
      const bottomBar = document.createElement("div");

      [topBar, bottomBar].forEach((bar) => {
        bar.style.width = "100%";
        bar.style.position = "absolute";
        bar.style.transition = "height 0.3s ease";
      });

      topBar.style.top = "0";
      bottomBar.style.bottom = "0";

      evalContainer.appendChild(topBar);
      evalContainer.appendChild(bottomBar);

      // Texte en bas
      const scoreText = document.createElement("div");
      scoreText.style.position = "absolute";
      scoreText.style.bottom = "0";
      scoreText.style.left = "50%";
      scoreText.style.transform = "translateX(-50%)";
      scoreText.style.color = "red";
      scoreText.style.fontWeight = "bold";
      scoreText.style.fontSize = "12px";
      scoreText.style.pointerEvents = "none";
      evalContainer.appendChild(scoreText);

      boardContainer.parentNode.style.display = "flex";
      // boardContainer.parentNode.appendChild(evalContainer);
      boardContainer.parentNode.insertBefore(evalContainer, boardContainer);

      function parseScore(scoreStr) {
        if (!scoreStr) {
          return { score: 0, mate: false };
        }

        scoreStr = scoreStr.trim();
        let mate = false;
        let score = 0;

        if (scoreStr.startsWith("#")) {
          mate = true;
          scoreStr = scoreStr.slice(1);
        }

        score = parseFloat(scoreStr.replace("+", "")) || 0;
        return { score, mate };
      }

      function update(scoreStr, color = "white") {
        let { score, mate } = parseScore(scoreStr);
        let percent = 50;

        if (mate) {
          let sign = score > 0 ? "+" : "-";
          scoreText.textContent = "#" + sign + Math.abs(score);
          if (
            (score > 0 && color === "white") ||
            (score < 0 && color === "black")
          ) {
            percent = 100;
          } else {
            percent = 0;
          }
        } else {
          let sign = score > 0 ? "+" : "";
          scoreText.textContent = sign + score.toFixed(1);
          if (color === "black") score = -score;
          if (score >= 7) {
            percent = 90;
          } else if (score <= -7) {
            percent = 10;
          } else {
            percent = 50 + (score / 7) * 40;
          }
        }

        if (color === "white") {
          bottomBar.style.background = "#ffffff";
          topBar.style.background = "#312e2b";
        } else {
          bottomBar.style.background = "#312e2b";
          topBar.style.background = "#ffffff";
        }

        bottomBar.style.height = percent + "%";
        topBar.style.height = 100 - percent + "%";
      }

      update(initialScore, initialColor);
      return { update };
    }

    async function movePiece(from, to, delay) {
      const fromSquare = from;
      const toSquare = to;
      const moveDelay = delay;

      const board = document.querySelector("cg-board");
      const rect = board.getBoundingClientRect();

      const boardInfo = {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      };

      chrome.runtime.sendMessage({ type: "BOARD_INFO", boardInfo });
      const coordFrom = squareToPixels(fromSquare, boardInfo, getSide());
      const coordTo = squareToPixels(toSquare, boardInfo, getSide());

      await sleep(moveDelay);

      chrome.runtime.sendMessage({
        type: "DRAG_MOVE",
        fromX: coordFrom.x,
        fromY: coordFrom.y,
        toX: coordTo.x,
        toY: coordTo.y,
      });
    }

    window.onkeyup = async (e) => {
      if (e.key === config.key) {
        movePiece(keyMove.from, keyMove.to, 0);
      }
    };

    setInterval(() => {
      // eval bar


      if (config.stat && !document.querySelector("#acc-widget")) {
          statObj = createSimpleAccuracyDisplay(
            100,
            1500,
            100,
            1500,
            getSide(),
          );
        }

        if (!config.stat && document.querySelector("#acc-widget")) {
          statObj = null;
          document.querySelector("#acc-widget").remove();
        }


      if (!document.querySelector("#customEval") && config.showEval) {
        const boardContainer = document.querySelector("cg-board");
        if (boardContainer) {
          evalObj = createEvalBar("0.0", getSide());
        }
      }

      // Fen
      fen_ = getFEN();
      if (fen_ && fen_ !== currentFen) {
        // console.log(fen_)
        currentFen = fen_;
        clearHighlightSquares();

        if (!config.showEval && document.querySelector("#customEval")) {
          document.querySelector("#customEval").remove();
          evalObj = null;
        }

        if (
          (getSide()[0] === "w" && fen_.split(" ")[1] === "w") ||
          (getSide()[0] === "b" && fen_.split(" ")[1] === "b")
        ) {
          engine.getMovesByFen(fen_, getSide()).then(async (moves) => {
            keyMove.from = moves[0].from;
            keyMove.to = moves[0].to;
            chrome.runtime.sendMessage({ type: "FROM_CONTENT", data: moves });
            highlightMovesOnBoard(moves, getSide()[0]);

            if (moves.length > 0 && evalObj) {
              evalObj.update(moves[0].eval, getSide());
            }

            if (moves.length > 0 && config.autoMove) {
              movePiece(
                moves[0].from,
                moves[0].to,
                randomIntBetween(0, config.delay),
              );
            }
          });
        }
      }
    }, interval);

    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === "local" && changes.chessConfig) {
        const newConfig = changes.chessConfig.newValue;
        config = newConfig;
        engine.updateConfig(
          config.lines,
          config.depth,
          config.style,
          config.elo + 700,
        );
      }
    });

    chrome.runtime.onMessage.addListener(async (message, sender) => {
      if (message.type === "history") {
        
        const whiteElo = getElo(getSide())?.white || null
        const blackElo = getElo(getSide())?.black || null

        if (config.stat && statObj) {
          let historyMessage = message.data;
          const result = await analyzer.update(historyMessage, {whiteElo : whiteElo , blackElo : blackElo});
          // console.log(result)
          statObj.update(
            result.white.accuracy,
            result.white.elo,
            result.black.accuracy,
            result.black.elo,
            getSide(),
          );
        }
      }
    });
  }
};

const LOCAL_VERSION = "1.2";

let downloadlink = "https://www.youtube.com/@Redson_Eric";

async function checkUpdate() {
  try {
    const url =
      "https://api.github.com/repos/Red-Eric/ChessBot-CDP/contents/ChessKiller/update.json?ref=master";

    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        Authorization:
          "Bearer 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",
        Accept: "application/vnd.github+json",
      },
    });

    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    }

    const result = await response.json();
    const content = atob(result.content.replace(/\n/g, ""));
    const data = JSON.parse(content);

    if (data.version !== LOCAL_VERSION) {
      downloadlink = data.link;
      return true;
    }

    return false;
  } catch (err) {
    console.error("Erreur fetch:", err);
    return true;
  }
}

(async () => {
  const updateNeeded = await checkUpdate();
  if (!updateNeeded) {
    startCheat();
  }
  if (updateNeeded) {
    if (
      window.location.hostname.includes("chess.com") ||
      window.location.hostname.includes("lichess") ||
      window.location.hostname.includes("worldchess")
    ) {
      alert("Your ChessHv3 extension is outdated");
      window.open(downloadlink, "_blank");
    }
  }
})();

// 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

// (async () => {
//   await analyzer.init();

//   const result = await analyzer.update(fenHistory);
//   console.log(result.white.accuracy, result.moves.at(-1).classification);
//   console.log(result.black.accuracy, result.moves.at(-1).classification);
// })();
