import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { fetchCharacters, changeCurrentPage } from '../../store/actions/actions';
import { useSelector } from 'react-redux';
import './Footer.css';

const Footer = () => {
  const dispatch = useDispatch();
  const totalPageAmount = useSelector(state => state.main.totalPageAmount);

  const pageHandler = event => {
    dispatch(fetchCharacters(event.selected));
    dispatch(changeCurrentPage(event.selected));
  };

  return (
    <div className="footer">
      <ReactPaginate
        className="pagination"
        breakLabel="..."
        nextLabel="next >"
        previousLabel="< previous"
        pageRangeDisplayed={2}
        pageCount={totalPageAmount}
        marginPagesDisplayed={1}
        onPageChange={event => pageHandler(event)}
      />
    </div>
  );
};

export default Footer;
