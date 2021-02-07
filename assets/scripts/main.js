const hornSound = document.getElementById('horn-sound')
const volumeNumber = document.getElementById('volume-number')
const honkButton = document.getElementById('honk-btn')
const audioSelection = document.getElementById('audio-selection')
const radioSound = document.getElementsByName('radio-sound') 
const volumeSlider = document.getElementById('volume-slider')


audioSelection.onchange = () => {
  handleAudioSelectionChange()
}

volumeNumber.onchange = (event) => {
  const targetName = event.currentTarget.name
  handleVolumeChange(targetName)
}

volumeSlider.onchange = (event) => {
  const targetName = event.currentTarget.name
  handleVolumeChange(targetName)
}

honkButton.onclick = (event) => {
  event.preventDefault()
  hornSound.play()
}

function handleAudioSelectionChange() {
  const radioSoundList = Array.from(radioSound)
  const soundImage = document.getElementById('sound-image')

  const soundDataList = [
    {
      id: 'radio-air-horn',
      image: './assets/media/images/air-horn.svg',
      sound: './assets/media/audio/air-horn.mp3',
    },
    {
      id: 'radio-car-horn',
      image: './assets/media/images/car.svg',
      sound: './assets/media/audio/car-horn.mp3',
    },
    {
      id: 'radio-party-horn',
      image: './assets/media/images/party-horn.svg',
      sound: './assets/media/audio/party-horn.mp3',
    },
  ]

  radioSoundList.forEach((radioSound) => {
    if (radioSound.checked) {
      const soundData = soundDataList.find(
        (sound) => radioSound.id === sound.id
      )

      const {image, sound} = soundData
      soundImage.src = image
      hornSound.src = sound
    }
  })
}

function handleVolumeChange(volumeChanger) {
  if (volumeChanger === 'volume-number') {
    volumeSlider.value = volumeNumber.value
  } else {
    volumeNumber.value = volumeSlider.value
  }
  hornSound.volume = volumeSlider.value / 100
  changeAudioImage()
}

function changeAudioImage() {
  const audioLevel = +volumeNumber.value
  const volumeImage = document.getElementById('volume-image')
  const loud = audioLevel > 66 && audioLevel < 101
  const medium = audioLevel > 33 && audioLevel < 67
  const quiet = audioLevel > 0 && audioLevel < 34
  const muted = !loud && !medium && !quiet
  honkButton.disabled = muted

  if (loud) volumeImage.src = './assets/media/icons/volume-level-3.svg'

  if (medium) volumeImage.src = './assets/media/icons/volume-level-2.svg'

  if (quiet) volumeImage.src = './assets/media/icons/volume-level-1.svg'

  if (muted) volumeImage.src = './assets/media/icons/volume-level-0.svg'
}
