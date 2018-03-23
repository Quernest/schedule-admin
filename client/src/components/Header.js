import React from 'react';

const languages = [
  {
    id: 0,
    label: 'en',
    icon: 'eng',
  },
  {
    id: 1,
    label: 'ru',
    icon: 'ru',
  },
  {
    id: 2,
    label: 'ua',
    icon: 'ua',
  },
];

const Header = () => (
  <header className="header">
    <div className="header-logo">
      <a href="/">
        <img src={require('../../assets/img/logo.svg')} alt="logo" />
      </a>
    </div>
    <div className="header__languages">
      <ul className="header__languages-list">
        {languages.map((language) => {
          const { label, icon, id } = language;

          return (
            <li className="header__languages-list-item" key={id}>
              <img
                src={require(`../../assets/img/flags/${icon}.svg`)}
                alt={`${label} translation`}
              />
            </li>
          );
        })}
      </ul>
    </div>
  </header>
);

export default Header;
