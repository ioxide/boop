export class GameConstants {
    public static COLORS:Array<string> = ['red', 'purple', 'yellow', 'teal'];
    public static SOUNDS:Map<string,HTMLAudioElement> = new Map<string,HTMLAudioElement>()
        .set('red', new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'))
        .set('purple', new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'))
        .set('yellow', new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'))
        .set('teal', new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'));

}


