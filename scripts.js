const problemBox = document.getElementById("problemBox");
const codeBox = document.getElementById("codeBox");

const searchResult = document.getElementById("searchResult");
const searchBar = document.getElementById("searchBar");

function view(pnum) {
    problemBox.innerHTML = `${pnum}. ${db[pnum].problem}`;
    codeBox.innerHTML = db[pnum].code;
}

searchBar.addEventListener('input', () => {
    searchResult.replaceChildren();
    const query = searchBar.value.toLocaleLowerCase();
    Object.entries(db).forEach(([pnum, data]) => {
        const current = `${pnum}. ${data.problem}`.toLocaleLowerCase();
        if(current.search(query) != -1) {
            const div = document.createElement('div');
            div.innerHTML = `${pnum}. ${data.problem}`;
            div.addEventListener('click', () => { view(pnum); });
            searchResult.append(div);
        }
    });
});
searchBar.dispatchEvent(new Event('input'), {});