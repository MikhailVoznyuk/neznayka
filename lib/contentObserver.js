const startAnimation = (entries, observer) => {
    entries.forEach(entry => {
      entry.target.el.style.transform = 'translateY(0px)';;
    });
  };
  

export default function observeElements(itemsClass) {
    const observer = new IntersectionObserver(startAnimation);
    const options = { root: null, rootMargin: '0px', threshold: 1 }; 
    
    const elements = document.querySelectorAll(itemsClass);
    
    
    elements.forEach(el => {
        el.style.transform = 'translateY(20px)';
        el.style.transition= '0.3s ease';
        
        observer.observe(el, options);
    });
}
