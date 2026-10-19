const isHomePage = Boolean(document.querySelector('#shops .cards'));
const homePrefix = isHomePage ? '' : '../index.html';
const bottomNavigation = document.createElement('nav');
bottomNavigation.className = 'mobile-bottom-nav';
bottomNavigation.setAttribute('aria-label', 'スマートフォン用のクイックメニュー');
bottomNavigation.innerHTML = `<a href="${isHomePage ? '#main' : '../index.html'}">ホーム</a><a href="${homePrefix}#shops">お店一覧</a><a href="${homePrefix}#community">地域案内</a>`;
document.body.append(bottomNavigation);

if (isHomePage && typeof allShopProfiles !== 'undefined') {
  const directory = document.createElement('section');
  directory.className = 'mobile-shop-directory';
  directory.setAttribute('aria-labelledby', 'mobile-shops-title');
  directory.innerHTML = `<div class="wrap"><h2 id="mobile-shops-title">お店へ、すぐに。</h2><p>全${allShopProfiles.length}店・事業所から選べます。</p><div class="mobile-shop-links">${allShopProfiles.map(shop => `<a href="shops/${shop.id}.html">${shop.name}<span aria-hidden="true">↗</span></a>`).join('')}</div><a class="mobile-directory-all" href="#shops">写真で一覧を見る・絞り込む ↓</a></div>`;
  document.querySelector('main').prepend(directory);

  const grid = document.querySelector('#shops .cards');
  grid.id = 'shop-card-list';
  const controls = document.createElement('div');
  controls.className = 'shop-view-controls';
  controls.setAttribute('role', 'group');
  controls.setAttribute('aria-label', 'スマートフォンでの店舗一覧の表示方法');
  controls.innerHTML = '<button type="button" aria-pressed="true" aria-controls="shop-card-list" data-expanded="false">写真で一覧</button><button type="button" aria-pressed="false" aria-controls="shop-card-list" data-expanded="true">紹介も読む</button>';
  grid.before(controls);
  controls.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    grid.classList.toggle('shop-expanded', button.dataset.expanded === 'true');
    controls.querySelectorAll('button').forEach(control => {
      control.setAttribute('aria-pressed', String(control === button));
    });
  });
}
