export default function VideoController() {
    const mainVideo = document.querySelector('.side-screen-inner__video-container video');
    const menuVideo = document.querySelector('.menu__sphere-container video');
    const formVideo = document.querySelector('.contact-form__sphere-container video');
    window.addEventListener('load', () =>  {
        mainVideo.play()
    })

    document.addEventListener('menuopen', () => {
        mainVideo.pause()
        menuVideo.play()
    })

    document.addEventListener('menuclose', () => {
        mainVideo.play()
        menuVideo.pause()
        
    })
    document.addEventListener('formopen', () => {
        mainVideo.pause()
        formVideo.play()
    })

    document.addEventListener('formclose', () => {
        mainVideo.play()
        formVideo.pause()
        
    })
}