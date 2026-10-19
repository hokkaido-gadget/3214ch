const registrySearch = document.querySelector('#registry-search');
if (registrySearch) {
  const registryRows = [...document.querySelectorAll('.membership tbody tr')].slice(1);
  const result = document.querySelector('#registry-result');
  function filterRegistry() {
    const query = registrySearch.value.normalize('NFKC').trim().toLocaleLowerCase();
    let count = 0;
    registryRows.forEach(row => {
      const visible = row.textContent.normalize('NFKC').toLocaleLowerCase().includes(query);
      row.hidden = !visible;
      if (visible) count++;
    });
    result.textContent = `${registryRows.length}件のうち ${count}件を表示（掲載当時の名簿）`;
  }
  registrySearch.addEventListener('input', filterRegistry);
  filterRegistry();
}
