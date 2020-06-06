export default class Error {
  constructor({$target}) {
    this.$target = $target;
    this.errorData = null;

    this.render();
  }

  setState(nextData) {
    this.errorData = nextData;
    this.render();
  }

  render() {
    if(!this.errorData) return;

    this.$target.textContent = '';

    const errorSection = document.createElement('section');
    errorSection.className = 'error-section';

    const errorImage = document.createElement('img');
    errorImage.className = 'error-image';
    errorImage.src = '/src/img/squarecat.jpg';

    const statusCode = document.createElement('p');
    statusCode.className = 'status-code';
    statusCode.textContent = this.errorData.status;

    const errorMessage = document.createElement('p');
    errorMessage.className = 'error-message';
    errorMessage.textContent = this.errorData.message;

    const returnBtn = document.createElement('button');
    returnBtn.className = 'return-btn';
    returnBtn.textContent = '돌아가기';
    returnBtn.addEventListener('click', () => {
      location.reload();
    })

    errorSection.appendChild(errorImage);
    errorSection.appendChild(statusCode);
    errorSection.appendChild(errorMessage);
    errorSection.appendChild(returnBtn);

    this.$target.appendChild(errorSection);
  }
}