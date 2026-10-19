const shopGrid = document.querySelector('.cards');
shopGrid.innerHTML = allShopProfiles.map(shop => `<a class="card" href="shops/${shop.id}.html" data-category="${shop.category}" data-keywords="${shop.name} ${shop.label} ${shop.intro} ${shop.items.map(item => item[0]).join(' ')}"><img class="shop-cover" src="${shop.photos[0].path}" alt="${shop.name}の紹介写真" loading="lazy"><div class="card-body"><span class="tag">${shop.label}</span><h3>${shop.name}</h3><p>${shop.intro}</p><div class="shop-facts-mini">${shop.address}</div><div class="card-foot"><span>写真と詳しい紹介を見る</span><span>↗</span></div></div></a>`).join('');
const shopSummary = document.createElement('p');
shopSummary.className = 'shop-list-summary';
shopSummary.setAttribute('role', 'status');
shopGrid.before(shopSummary);
const refreshShopCount = () => {
  const count = [...shopGrid.querySelectorAll('.card')].filter(card => !card.hidden).length;
  shopSummary.textContent = `全${allShopProfiles.length}店舗・事業所のうち ${count}件を表示`;
};
new MutationObserver(refreshShopCount).observe(shopGrid, {attributes: true, subtree: true, attributeFilter: ['hidden']});
document.querySelector('#shops .note').textContent = '現サイトの掲載14店舗・事業所を収録しました。写真付きの紹介ページで、お店の特徴・商品・サービス・地図をご覧いただけます。営業情報は掲載元に基づき、来店前の確認をお願いします。';
const coverage = document.createElement('p');
coverage.className = 'shop-coverage';
coverage.textContent = '掲載範囲：現サイトの店舗紹介と店舗サイトマップを照合（2026年10月19日）。同じ店舗に転送される旧URLは重複としてまとめています。三石商店会の名簿とは掲載範囲が異なります。';
document.querySelector('#shops .note').after(coverage);
filterShops();
refreshShopCount();
const previousShopId = location.hash.replace('#shop-', '');
if (location.hash.startsWith('#shop-') && allShopProfiles.some(shop => shop.id === previousShopId)) {
  location.replace(`shops/${previousShopId}.html`);
}
