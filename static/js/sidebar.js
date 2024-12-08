/*

<nav class="panel">
  <p class="panel-heading">Repositories</p>
  <div class="panel-block">
    <p class="control has-icons-left">
      <input class="input" type="text" placeholder="Search" />
      <span class="icon is-left">
        <i class="fas fa-search" aria-hidden="true"></i>
      </span>
    </p>
  </div>
  <p class="panel-tabs">
    <!-- A Tag; class panel-block is-active-->
  </p>
  <!-- A Tag; class is-active-->
  
</nav>

*/


function fetch_trades() {
    let side_back_panel_block = document.getElementById('sidebar_panel_items');

    fetch(`/api/trades/${localStorage.getItem("side_bar_active_tab")}/get_all`).then(response => response.json()).then(data => {
        console.log(data)
        side_back_panel_block.innerHTML = '';
        data.all.forEach(trade => {
            let type_of_trade = trade.details.Stock == undefined ? 'Option' : 'Stock';
            let details = trade.details.Stock == undefined ? trade.details.Option : trade.details.Stock;
            let output_string = `${type_of_trade} : ${trade.symbol} ${details.quantity} @ $${details.price}`;


            let panel_block = document.createElement('a');
            panel_block.classList.add('panel-block');
            panel_block.id = trade.uid;
            panel_block.textContent = output_string;
            side_back_panel_block.appendChild(panel_block);
            panel_block.addEventListener('click', function(event) {
                localStorage.setItem("active_trade", trade.uid);
            });
        });
    });
}


function sidebar() {
    let sidebar_container = document.getElementById('sidebar_container');

    let panel = document.createElement('nav');
    panel.classList.add('panel', 'is-link');
    panel.id = 'sidebar_panel';

    let panel_heading = document.createElement('p');
    panel_heading.classList.add('panel-heading');
    panel_heading.textContent = 'Investments';

    let panel_block = document.createElement('div');
    panel_block.classList.add('panel-block');
    panel_block.id = 'sidebar_panel_block';

    let control = document.createElement('p');
    control.classList.add('control');
    control.classList.add('has-icons-left');

    let input = document.createElement('input');
    input.classList.add('input');
    input.type = 'text';
    input.placeholder = 'Search';

    let span = document.createElement('span');
    span.classList.add('icon');
    span.classList.add('is-left');

    let i = document.createElement('i');
    i.classList.add('fas');
    i.classList.add('fa-search');
    i.setAttribute('aria-hidden', 'true');


    let sidebar_panel_items = document.createElement('div');
    sidebar_panel_items.id = 'sidebar_panel_items';

    span.appendChild(i);
    control.appendChild(input);
    control.appendChild(span);
    panel_block.appendChild(control);

    let panel_tabs = document.createElement('p');
    panel_tabs.classList.add('panel-tabs');

    let all_tab = document.createElement('a');
    all_tab.classList.add('panel-tabs');
    all_tab.textContent = 'All';
    panel_tabs.appendChild(all_tab);

    fetch('/api/accounts/get/All').then(response => response.json()).then(data => {
        console.log(data);
        for(const key in data) {
            let a = document.createElement('a');
            a.classList.add('panel-tabs');
            a.textContent = key;
            panel_tabs.appendChild(a);
        }
    });

    if (localStorage.getItem("side_bar_active_tab") === null) {
        localStorage.setItem("side_bar_active_tab", "All");
    }

    if (localStorage.getItem("side_bar_active_tab") === 'All') {
        all_tab.classList.add('is-active');
    } else {
        let active_tab = localStorage.getItem("side_bar_active_tab");
        let tabs = document.querySelectorAll('.panel-tabs a');
        tabs.forEach(tab => {
            if (tab.textContent === active_tab) {
                tab.classList.add('is-active');
            } else {
                tab.classList.remove('is-active');
            }
        });
    }

    panel_tabs.addEventListener('click', function(event) {
        let tabs = document.querySelectorAll('.panel-tabs a');
        tabs.forEach(tab => {
            tab.classList.remove('is-active');
        });
        event.target.classList.add('is-active');
        localStorage.setItem("side_bar_active_tab", event.target.textContent);

        fetch_trades();
        
    });



    panel.appendChild(panel_heading);
    panel.appendChild(panel_tabs);
    panel.appendChild(panel_block);
    panel.appendChild(sidebar_panel_items);

    sidebar_container.appendChild(panel);
    fetch_trades();
}