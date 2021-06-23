const app = Vue.createApp({
  data: function () {
    return {
      title: 'High Low',
      min: 1,
      max: 10,
      maxGuesses: 3,
      game: {
        active: false,
        number: 0,
        guesses: 0,
        wins: 0,
        loses: 0,
        guess: '',
        message: ''
      }
    }
  },
  created: function () {
    const game = localStorage.getItem('highlow')

    if (game) {
      this.game = JSON.parse(game)
    }
  },
  methods: {
    playGame: function () {
      this.game.active = true
      this.game.message = `Guess a number between ${this.min} and ${this.max}.`
      this.game.guesses = 0
      this.game.number = Math.floor(Math.random() * this.max) + this.min
    },
    verifyGuess: function () {
      if (this.game.guess === this.game.number) {
        this.game.message = 'You guessed the number!'
        this.game.wins++
        this.resetGame()
      } else {
        this.game.guesses++
        if (this.game.guesses < this.maxGuesses) {
          if (this.game.guess < this.game.number) {
            this.game.message = `Your guess was too low. Guesses remaining: ${this.maxGuesses - this.game.guesses}.`
          } else {
            this.game.message = `Your guess was too high. Guesses remaining: ${this.maxGuesses - this.game.guesses}.`
          }
        } else {
          this.game.message = `Sorry you are out of guesses. The number was ${this.game.number}.`
          this.game.loses++
          this.resetGame()
        }
      }
    },
    resetGame: function () {
      const that = this
      setTimeout(function () {
        that.game.message = ''
        that.game.guess = ''
        that.game.active = false
      }, 4000)
    }
  },
  watch: {
    game: {
      deep: true,
      handler: function (game) {
        localStorage.setItem('highlow', JSON.stringify(game))
      }
    }
  }
})

const vm = app.mount('#app')
