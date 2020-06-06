import SearchingSection from "./components/SearchingSection.js";
import ResultsSection from "./components/ResultsSection.js";
import DetailModal from "./components/DetailModal.js";
import Loading from "./components/Loading.js";
import Error from "./components/Error.js";

import { api } from "./api/theCatApi.js";
import { getItem, setItem } from "./util/sessionStorage.js";

export default class App {
  constructor($target) {
    /**
     * [새로고침 후에도 결과 화면 유지하기]
     * 새로고침 해도 저장소에 저장되어 있는 데이터를 가져옴
     */
    const keywords = getItem('keywords');
    const data = getItem('data');

    const searchingSection = new SearchingSection({
      $target,
      keywords,
      onSearch: async keyword => {
        loading.toggleSpinner();  // 로딩화면 띄워주기

        const response = await api.fetchCats(keyword);
        console.log('fetchCats response', response)

        if(!response.isError) {
          setItem('data', response.data);  // 마지막 검색 결과 화면이 유지되도록 하기 위해 검색한 결과 데이터를 갖고 있어야함
          resultsSection.setState(response.data);
          loading.toggleSpinner();  // 로딩화면 숨김
        } else {
          error.setState(response.data);
        }
      },
      onRandom: async () => {
        loading.toggleSpinner();

        const response = await api.fetchRandomCats();
        if(!response.isError) {
          setItem('data', response.data);
          resultsSection.setState(response.data);
          loading.toggleSpinner();  // 로딩화면 숨김
        } else {
          error.setState(response.data);
        }
      }
    });

    const resultsSection = new ResultsSection({
      $target,
      data,
      onClick: data => {
        detailModal.setState(data);
      },
      onScroll: async () => {
        loading.toggleSpinner();

        const response = await api.fetchRandomCats();
        if(!response.isError) {
          const beforeData = getItem('data');
          const nextData = beforeData.concat(response.data);

          setItem('data', nextData);
          resultsSection.setState(nextData);
          loading.toggleSpinner();  // 로딩화면 숨김
        } else {
          error.setState(response.data);
        }
      }
    });

    const detailModal = new DetailModal({
      $target
    });

    const loading = new Loading({
      $target
    });

    const error = new Error({
      $target
    });

    const darkmodeBtn = document.createElement('span');
    darkmodeBtn.className = 'darkmode-btn';
    darkmodeBtn.textContent = '🌕';

    $target.appendChild(darkmodeBtn);
  }
}