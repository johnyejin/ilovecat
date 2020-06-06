import Card from './Card.js'
import { lazyLoad } from '../util/lazyLoad.js'
import { scrollFetch } from '../util/scrollFetch.js'

export default class ResultSection {
  constructor({ $target, data, onClick, onScroll }) {
    this.data = data;
    this.onClick = onClick;
    this.onScroll = onScroll;
    this.section = document.createElement('section');
    this.section.className = 'results-section';

    $target.appendChild(this.section);

    this.render();
    lazyLoad();
    scrollFetch(this.onScroll);
  }

  setState(data) {
    this.data = data;
    this.render();  // 상태가 변할때마다 다시 렌더링
    lazyLoad();
  }

  findCatById(id) {
    const result = this.data.find(cat => cat.id === id);
    return result;
  }

  render() {
    if(!this.data) return;

    this.section.textContent = '';

    if(this.data.length > 0) {
      // 받아온 데이터가 있을 때
      const cardContainer = document.createElement('div');
      cardContainer.className = 'card-container';

      // 카드 생성
      this.data.map(cat => {
        new Card({
          $target: cardContainer,
          data: cat
        });
      });

      /**
       * event delegation을 위해 cardContainer에 이벤트 추가
       * card 클릭 시 Bubbling이 일어나면서 Modal을 띄우는 클릭 이벤트를 발생시킴
       */
      cardContainer.addEventListener('click', e => {
        const path = e.path;
        const card = path.find(comp => comp.className === 'cat-card');

        if(card) {
          const id = card.dataset.id;
          const catInfo = this.findCatById(id);

          this.onClick(catInfo);
        }
      });

      this.section.appendChild(cardContainer);
    } else {
      // 받아온 데이터가 없을 때
      const noticeSection = document.createElement('section');
      noticeSection.className = 'notice-section';

      const notice = document.createElement('h2');
      notice.className = 'notice';
      notice.textContent = '검색 결과가 없습니다😿';

      const noticeImage = document.createElement('img');
      noticeImage.className = 'notice-image';
      noticeImage.src = 'src/img/emptybox.png';

      noticeSection.appendChild(notice);
      noticeSection.appendChild(noticeImage);
      this.section.appendChild(noticeSection);
    }
  }
}
/**
 * ResultSections <section>
    ㄴ cardContainer(Card Wrapper) <div>
        ㄴ card <article>
            ㄴ card image <img>
            ㄴ card info <article>
              ㄴ name <p>
              ㄴ origin <p>
 */