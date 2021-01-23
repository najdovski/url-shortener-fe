import { useEffect } from 'react';

const UpdateHtml = ({component}) => {

  useEffect(() => {
    if (component === 'RedirectOrNotFound') {
      // Hide it from the crawlers
      const meta = document.createElement('meta');
      meta.name = 'robots';
      meta.setAttribute('content', 'noindex, nofollow');
      document.querySelector('head').appendChild(meta);
      document.querySelector('#title-second-part').innerText = '- URL Shortener';
      return;
    } else {
      document.querySelector('meta[name="robots"]')?.remove();
    }


    switch(component) {
      case 'Home':
      case 'VerifyEmail':
      case 'ResetPassword':
        document.querySelector('#title-second-part').innerText = '- URL Shortener';
        document.querySelector('meta[name="description"]').setAttribute('content', 'A free service for converting long links into custom links that are easy to remember, easy to share and SEO friendly, that comes with a free user dashboard for link statistics and management.');
        document.querySelector('meta[name="keywords"]').setAttribute('content', 'url shortener, link shortener, free url shortener, free link shortener, cut url free, cut link free, axe url, axe link, axe my link, axe my url, custom link shortener, custom url shortener, link management, url management, link statistics, url statistics, user dashboard');
        break;
      case 'Login':
        document.querySelector('#title-second-part').innerText = '- Login';
        document.querySelector('meta[name="description"]').setAttribute('content', 'Login to manage your shorten urls, create new custom links that are easy to remember, easy to share and SEO friendly.');
        document.querySelector('meta[name="keywords"]').setAttribute('content', 'url shortener login, link shortener login, free url shortener login, free link shortener login, cut url free login, cut link free login, axe url login, axe link login, axe my link login, axe my url login, custom link shortener login, custom url shortener login, link management login, url management login, link statistics login, url statistics login, user dashboard login');
        break;
      case 'Register':
        document.querySelector('#title-second-part').innerText = '- Register';
        document.querySelector('meta[name="description"]').setAttribute('content', 'Register, create a profile and url dashboard from where you can manage your shorten urls, create new custom links that are easy to remember, easy to share and SEO friendly.');
        document.querySelector('meta[name="keywords"]').setAttribute('content', 'url shortener register, link shortener register, free url shortener register, free link shortener register, cut url free register, cut link free register, axe url register, axe link register, axe my link register, axe my url register, custom link shortener register, custom url shortener register, link management register, url management register, link statistics register, url statistics register, user dashboard register');
        break;
      case 'MyUrls':
        document.querySelector('#title-second-part').innerText = '- Dashboard';
        document.querySelector('meta[name="description"]').setAttribute('content', 'Manage your shortened urls, create new custom SEO friendly links and keep track of the number of visits, by using your free dashboard.');
        document.querySelector('meta[name="keywords"]').setAttribute('content', 'url shortener dashboard, link shortener dashboard, free url shortener dashboard, free link shortener dashboard, cut url free dashboard, cut link free dashboard, axe url dashboard, axe link dashboard, axe my link dashboard, axe my url dashboard, custom link shortener dashboard, custom url shortener dashboard, link management dashboard, url management dashboard, link statistics dashboard, url statistics dashboard, user dashboard');
        break;
      case 'Profile':
        document.querySelector('#title-second-part').innerText = '- Profile';
        document.querySelector('meta[name="description"]').setAttribute('content', 'Manage your profile details, name, email and password. Keep your shortened urls in one place and manage them whenever you want.');
        document.querySelector('meta[name="keywords"]').setAttribute('content', 'url shortener profile, link shortener profile, free url shortener profile, free link shortener profile, cut url free profile, cut link free profile, axe url profile, axe link profile, axe my link profile, axe my url profile, custom link shortener profile, custom url shortener profile, link management profile, url management profile, link statistics profile, url statistics profile, user profile');
        break;
    }
  }, []);

  return null;
}

export default UpdateHtml
