export const throttling = () => {
  let throttleCheck;

  return {
    throttle(callback, milliseconds) {
      if(!throttleCheck) {
        throttleCheck = setTimeout(() => {
          callback(...arguments);
          throttleCheck = false;  // 설정한 주기마다 이벤트가 한번씩만 호출되도록
        }, milliseconds);
      }
    }
  };
};
/**
 * "작동방식"
 * throttleCheck를 통해 throttle 상태가 아닐 때만 callback을 실행
 * setTimeout은 timer id를 반환하기 때문에,
 * 호출 시점에 throttleCheck에 숫자가 할당되어 true 값으로 여겨짐
 * callback의 실행이 완료되고 throttleCheck를 false로 바꿔 다시 함수 호출이 가능한 상태로 바꿈
 */