// import $ from 'vendor/jquery.custom.min';

export default function ClickerFunction() {

    const clickers = document.querySelectorAll('h1');

    for (let i = 0; i < clickers.length; i++){
      clickers[i].addEventListener('click', () => {
        let clicker = clickers[i];
        console.log(clicker.textContent);
      });
    }

}