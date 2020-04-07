import React from 'react'

const renderShowsTotal = (start, to, total) => {
    return (
      <p className={'total-items'} >
        Showing { start } to { to } entries
      </p>
    );
  }


export const tableOptions = () => {
    return {
        page: 1,
        sizePerPage: 5,  // which size per page you want to locate as default
        pageStartIndex: 1, // where to start counting the pages
        paginationSize: 3,  // the pagination bar size.
        prePage: <span><i className={'fas fa-caret-left'} />&nbsp;&nbsp;Prev</span>   , // Previous page button text
        nextPage: <span>Next&nbsp;&nbsp;<i className={'fas fa-caret-right'} /></span>        , // Next page button text
        firstPage: 'First', // First page button text
        lastPage: 'Last', // Last page button text
        paginationShowsTotal: renderShowsTotal,  // Accept bool or function
        paginationPosition: 'bottom',  // default is bottom, top and both is all available
        hideSizePerPage: true// > You can hide the dropdown for sizePerPage
        // alwaysShowAllBtns: true // Always show next and previous button
        // withFirstAndLast: false > Hide the going to First and Last page button
    }
}