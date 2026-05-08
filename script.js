const scrollLinks = document.querySelectorAll('a[href^="#"]');
const sections = document.querySelectorAll('main section');
const header = document.querySelector('.site-nav');

function smoothScroll(event) {
  const targetId = event.currentTarget.getAttribute('href');
  if (targetId.startsWith('#')) {
    event.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth',
      });
    }
  }
}

scrollLinks.forEach(link => link.addEventListener('click', smoothScroll));

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  },
  {
    threshold: 0.15,
  }
);

document.querySelectorAll('.reveal').forEach(section => observer.observe(section));

const navObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (navLink) {
        navLink.classList.toggle('active', entry.isIntersecting);
      }
    });
  },
  {
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0,
  }
);

sections.forEach(section => navObserver.observe(section));

window.addEventListener('scroll', () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 20);
});
