import { throttling } from './throttle.js';

const throttler = throttling();

export function scrollFetch(fetchData) {
  window.addEventListener('scroll', () => {
    throttler.throttle(() => {
      if(getScrollTop() < getDocumentHeight() - window.innerHeight) return;
      fetchData();
    }, 700);
  });
  
  // 현재 스크롤한 높이를 구하는 함수
  const getScrollTop = () => {
    return (window.pageYOffset !== undefined) ? 
      window.pageYOffset :  // 수직으로 얼마나 스크롤됐는지
      (document.documentElement || document.body.parentNode || document.body).scrollTop;  // scrollTop: elem에서 현재 보이는 부분의 가장 상단의 거리 
  }
  
  // 문서의 높이를 구하는 함수
  const getDocumentHeight = () => {
    const body = document.body;
    const html = document.documentElement;

    /**
     * clientHeight: elem에서 보여지는 부분의 높이(padding 포함 / boader, scrollBar 포함X)
     * scrollHeight: elem가 포함하고 있는 컨텐츠 전체의 높이
     * offsetHeight: elem의 padding, border, scrollBar를 포함하는 높이
     */
    return Math.max(
      body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight
    );
  }
}