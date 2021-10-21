
const search = instantsearch({
  indexName: 'publications',
  searchClient: algoliasearch(
    '40URO6292P',
    '524411a08e174dd520989209dd9a1d7d'
  ),
});

// Add widgets
// ...


/* ---------- */
/* Search Box */
/* ---------- */
search.addWidget(
instantsearch.widgets.searchBox({
  container: '#ais-widget-search-box',
  placeholder: 'Search by keywords, type of Survey, Sample size etc',
  showSubmit: true,
  showReset: true,
  searchAsYouType: true,
  showLoadingIndicator: false,
  // queryHook: function(query, searchInstance) {
  // const queryCleaned = checkForEIN(query);
  // readyToSearchScrollPosition();
  // searchInstance(queryCleaned);
  // initTooltips();
  // },
}),
);


const templateHits = `
        <div class="row row-grant-names">
        <div class="col s12 m6">
        <span class="text-bold">{{#helpers.highlight}}{ "attribute": "Title" }{{/helpers.highlight}}</span> <!--<span class="text-muted small">({{ }})</span>-->
        </div>
        <div class="col s12 m5">
        <span class="small text-light">DOI:<a class="truncate text-light" href="{{Url}}" title="Paper web-link">{{ DOI }}</a></span>
        </div>
        <div class="col m1 hide-on-small-only">
        <div class="actions-wrapper center-align">
            <a href="#" class="dropdown-trigger dropdown-trigger-hits blue-grey-text" data-target="{{ _id }}"><i class="material-icons md-18">more_vert</i></a>
            <ul id="{{ _id }}" class='dropdown-content'>
            <li><a href="{{Study_weblink}}"><i class="material-icons md-18 left">list_alt</i>Study web-link</a></li>
            </ul>
        </div>
        </div>
        </div>

        <div class="row">
        <div class="col s12 m6">
        <span class="small text-light">
            {{#Abstract_Note}}
                {{#helpers.highlight}}{ "attribute": "Abstract_Note" }{{/helpers.highlight}}
            {{/Abstract_Note}}
        </span>
        </div>
        <div class="col s12 m5">
        <span class="small text-light">
            Survey Source: {{ Extra }} <br>
            Author: {{Author}}

        </div>
        </div>

        <div class="row">
        <div class="col s10 grant-purpose">
        <span class="text-muted-max small">{{#helpers.highlight}}{ "attribute": "Publication_Title" }{{/helpers.highlight}} ({{ Item_Type }}, year: {{Publication_Year}})</span>
        </div>
        </div>`;




search.addWidget(
  instantsearch.widgets.hits({
    container: '#ais-widget-hits',
    templates: {
      item: templateHits,
    },
    cssClasses: {
      root: '',
      list: 'striped row',
      item: ['col', 's12', 'li-grants-search'],
    },
  //   transformItems(items) {
  //     return items.map(item => ({
  //       ...item,
  //       'grant_amount': `$${item.grant_amount.toLocaleString()}`,
  //     }));
  //   },
  }),
);


/* ---------- */
/* Pagination */
/* ---------- */
search.addWidget(
instantsearch.widgets.pagination({
  'container': '#ais-widget-pagination',
  'maxPages': 20,
  'scrollTo': '.nav-search',
  'cssClasses': {
  'root': 'pagination',
  'page': 'waves-effect',
  'selectedItem': 'active',
  'disabledItem': 'disabled',
  },
}),
);



search.addWidget(
  instantsearch.widgets.poweredBy({
    'container': '#powered-by',
  }),
);



const templateStats = `  {{#hasNoResults}}No results{{/hasNoResults}}
{{#hasOneResult}}1 result{{/hasOneResult}}
{{#hasManyResults}}{{#helpers.formatNumber}}{{nbHits}}{{/helpers.formatNumber}} results{{/hasManyResults}}
<!--<span class="small text-muted-max">found in {{processingTimeMS}}ms</span>-->`;


search.addWidget(
instantsearch.widgets.stats({
  container: '#ais-widget-stats',
  templates: {
  text: templateStats,
  },
  cssClasses: {
  text: 'text-muted',
  },
}),
);




/* Create desktop refinements */


const pubYear = instantsearch.widgets.panel({
templates: {
  header: '<i class="fa fa-chevron-right"></i>Year',
},
cssClasses: {
  header: 'panel-header',
},
})(instantsearch.widgets.refinementList);


search.addWidget(
    pubYear({
      container: `#ais-widget-refinement-list--Publication_Year`,
      attribute: 'Publication_Year',
      limit: 8,
      showMore: true,
      showMoreLimit: 20,
      cssClasses: {
      checkbox: 'filled-in',
      labelText: 'small',
      count: ['right', 'small'],
      showMore: 'btn-flat blue-grey-text small',
      disabledShowMore: 'hidden',
      },
      templates: {
      showMoreText: `  {{#isShowingMore}}
      [ - ] Showing top 20 results
    {{/isShowingMore}}
    {{^isShowingMore}}
      [ + ] Show top 20 results
    {{/isShowingMore}}`,
      },
  }),
  );


// search.addWidget(
//     instantsearch.widgets.refinementList({
//         container: `#ais-widget-refinement-list--Main_unit_of_observation`,
//         attribute: 'Main_unit_of_observation',
//         limit: 8,
//         showMore: true,
//         showMoreLimit: 20,
//         cssClasses: {
//         checkbox: 'filled-in',
//         labelText: 'small',
//         count: ['right', 'small'],
//         showMore: 'btn-flat blue-grey-text small',
//         disabledShowMore: 'hidden',
//         },
//         templates: {
//         showMoreText: `  {{#isShowingMore}}
//         [ - ] Showing top 20 results
//         {{/isShowingMore}}
//         {{^isShowingMore}}
//         [ + ] Show top 20 results
//         {{/isShowingMore}}`,
//         },
//     }),
//     );



const itemType = instantsearch.widgets.panel({
templates: {
  header: '<i class="fa fa-chevron-right"></i> Type of Study',
},
cssClasses: {
  header: 'panel-header',
},
})(instantsearch.widgets.refinementList);


search.addWidget(
itemType({
      container: `#ais-widget-refinement-list--Item_Type`,
      attribute: 'Item_Type',
      limit: 8,
      showMore: true,
      showMoreLimit: 20,
      cssClasses: {
      checkbox: 'filled-in',
      labelText: 'small',
      count: ['right', 'small'],
      showMore: 'btn-flat blue-grey-text small',
      disabledShowMore: 'hidden',
      },
      templates: {
      showMoreText: `  {{#isShowingMore}}
      [ - ] Showing top 20 results
      {{/isShowingMore}}
      {{^isShowingMore}}
      [ + ] Show top 20 results
      {{/isShowingMore}}`,
      },
  }),
  );


const extraList = instantsearch.widgets.panel({
templates: {
  header: '<i class="fa fa-chevron-right"></i> Source Survey',
},
cssClasses: {
  header: 'panel-header',
},
})(instantsearch.widgets.refinementList);


search.addWidget(
extraList({
    container: `#ais-widget-refinement-list--Extra`,
    attribute: 'Extra',
    limit: 8,
    showMore: true,
    showMoreLimit: 20,
    cssClasses: {
    checkbox: 'filled-in',
    labelText: 'small',
    count: ['right', 'small'],
    showMore: 'btn-flat blue-grey-text small',
    disabledShowMore: 'hidden',
    },
}),
);





// search.addWidget(
//   instantsearch.widgets.refinementList({
//       attribute: 'Country',
//       limit: 8,
//       showMore: true,
//       showMoreLimit: 20,
//       cssClasses: {
//       header: 'panel-header',
//       checkbox: 'filled-in',
//       labelText: 'small',
//       count: ['right', 'small'],
//       showMore: 'btn-flat blue-grey-text small',
//       disabledShowMore: 'hidden',
//       },
//       templates: {
//       showMoreText: `  {{#isShowingMore}}
//       [ - ] Showing top 20 results
//       {{/isShowingMore}}
//       {{^isShowingMore}}
//       [ + ] Show top 20 results
//       {{/isShowingMore}}`,
//       },
//   }),
//   );




/* ----------------- */
/* Clear Refinements */
/* ----------------- */
search.addWidget(
  instantsearch.widgets.clearRefinements({
      container: '#ais-widget-clear-all',
      cssClasses: {
      button: ['btn blue-grey white-text waves-effect waves-light'],
      },
      templates: {
      resetLabel: 'Clear filters',
      },
  }),
  );







search.start();



