export function initScrollToast() {

  const toastEl = document.getElementById('myToast');
  const toast = new bootstrap.Toast(toastEl);

  window.addEventListener('scroll', () => {  
    const scrollTop = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= docHeight) {
      toast.show();
    }
  });
}

