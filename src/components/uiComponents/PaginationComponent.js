import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const LEFT_PAGE = 'LEFT'
const RIGHT_PAGE = 'RIGHT'

class PaginationComponent extends Component {

    constructor(props) {
        super(props)
        this.currentPage = 1
        this.pageNeighbours =
          typeof pageNeighbours === "number"
            ? Math.max(0, Math.min(props.pageNeighbours, 2))
            : 0;

        this.getTotalPages = this.getTotalPages.bind(this)
    }

    componentDidMount() {
        this.gotoPage(1)
    }

    getTotalPages() {
        if (this.props.totalRecords == 0) return 1;
        return Math.ceil(this.props.totalRecords / this.props.pageLimit)
    }

    gotoPage(page) {
        const currentPage = Math.max(0, Math.min(page, this.getTotalPages()))
        this.currentPage = currentPage

        const paginationData = {
            currentPage,
            totalPages: this.getTotalPages(),
            pageLimit: this.props.pageLimit,
            totalRecords: this.props.totalRecords
        }

        this.props.onPageChanged(paginationData)
    }

    handleClick(page, evt) {
        evt.preventDefault()
        this.gotoPage(page)
    }

    handleMoveLeft(evt) {
        evt.preventDefault()
        this.gotoPage(this.currentPage - this.pageNeighbours * 2 - 1)
    }

    handleMoveRight(evt) {
        evt.preventDefault()
        this.gotoPage(this.currentPage + this.pageNeighbours * 2 + 1)
    }

    fetchPageNumbers() {
        const totalPages = this.getTotalPages()
        const currentPage = this.currentPage
        const pageNeighbours = this.pageNeighbours
        const totalNumbers = pageNeighbours * 2 + 3
        const totalBlocks = totalNumbers + 2

        if (totalPages > totalBlocks) {
            let pages = []

            const leftBound = currentPage - pageNeighbours
            const rightBound = currentPage + pageNeighbours
            const beforeLastPage = totalPages - 1

            const startPage = leftBound > 2 ? leftBound : 2
            const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage

            pages = _.range(startPage, endPage + 1)

            const pagesCount = pages.length
            const singleSpillOffset = totalNumbers - pagesCount - 1

            const leftSpill = startPage > 2
            const rightSpill = endPage < beforeLastPage

            const leftSpillPage = LEFT_PAGE
            const rightSpillPage = RIGHT_PAGE

            if (leftSpill && !rightSpill) {
                const extraPages = _.range(startPage - singleSpillOffset, startPage)
                pages = [leftSpillPage, ...extraPages, ...pages]
            } else if (!leftSpill && rightSpill) {
                const extraPages = _.range(endPage + 1, endPage + singleSpillOffset + 1)
                pages = [...pages, ...extraPages, rightSpillPage]
            } else if (leftSpill && rightSpill) {
                pages = [leftSpillPage, ...pages, rightSpillPage]
            }

            return [1, ...pages, totalPages]
        }

        return _.range(1, totalPages + 1)
    }

    render() {

        if (!this.props.totalRecords) return null

        if (this.getTotalPages() === 1) return null

        const { currentPage } = this
        const pages = this.fetchPageNumbers()

        return (
            <Fragment>
                <nav aria-label="Pagination">
                    <ul className="pagination">
                        {pages.map((page, index) => {
                            if (page === LEFT_PAGE)
                                return (
                                    <li key={index} className="page-item">
                                        <a
                                            className="page-link"
                                            href="#"
                                            aria-label="Previous"
                                            onClick={this.handleMoveLeft}
                                        >
                                            <span aria-hidden="true">&laquo</span>
                                            <span className="sr-only">Previous</span>
                                        </a>
                                    </li>
                                )

                            if (page === RIGHT_PAGE)
                                return (
                                    <li key={index} className="page-item">
                                        <a
                                            className="page-link"
                                            href="#"
                                            aria-label="Next"
                                            onClick={this.handleMoveRight}
                                        >
                                            <span aria-hidden="true">&raquo</span>
                                            <span className="sr-only">Next</span>
                                        </a>
                                    </li>
                                )

                            return (
                                <li
                                    key={index}
                                    className={`page-item${
                                        currentPage === page ? " active" : ""
                                    }`}
                                >
                                    <a
                                        className="page-link"
                                        href="#"
                                        onClick={e => this.handleClick(page, e)}
                                    >
                                        {page}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </Fragment>
        )
    }
}

PaginationComponent.propTypes = {
    totalRecords: PropTypes.number.isRequired,
    pageLimit: PropTypes.number,
    pageNeighbours: PropTypes.number,
    onPageChanged: PropTypes.func
}

export default PaginationComponent