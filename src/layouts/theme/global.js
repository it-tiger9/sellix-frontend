import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    h1, h2, h3, h4, h5, p, label, span, a, th, td, input, select {
        color: ${({ theme }) => theme.text} !important;
    }
    .admin-container {
        background: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text};
    }

    .text-green {
        color: #2BB224 !important;
    }

    .text-red {
        color: #B22424 !important;
    }

    .admin-container .app-header {
        background: ${({ theme }) => theme.cardBody} !important;
    }

    .admin-container .app-header * {
        color: ${({ theme }) => theme.text} !important;
    }

    .admin-container .sidebar {
        background: ${({ theme }) => theme.body};
    }

    .switch-primary .switch-input:checked + .switch-slider {
        background-color: #613BEA !important;
    }

    .detail-product-screen .stock-info {
        background-color: ${({ theme }) => theme.stockInfoBg};
    }

    .new-select i {
        color: ${({ theme }) => theme.text} !important;
    }

    .detail-product-screen .pay-button {
        background-color: ${({ theme }) => theme.payButton} !important;
        border: 1px solid ${({ theme }) => theme.payButtonBorder} !important;
    }

    .detail-product-screen .stock-info {
        // background: ${({ theme }) => theme.cardBody};
    }

    .searchbar .header-search-input,
    table tbody td .badge-normal,
    .Select-control,
    .react-datepicker__input-container input,
    .create-product-screen .payment-checkbox,
    .create-product-screen .file-switch .switch-slider,
    .image-uploader .drag-drop-area,
    .btn-default,
    .detail-product-screen .paypal-instant,
    .datepicker2
      {
        background-color: ${({ theme }) => theme.widget} !important;
        border: 1px solid ${({ theme }) => theme.widgetBorder} !important;
    }

    table tbody td {
        border-top: 1px solid ${({ theme }) => theme.tdBorder} !important;
    }

    .react-bootstrap-daterangepicker-container button {
        background-color: ${({ theme }) => theme.widget} !important;
    }

    .form-control {
        background-color: ${({ theme }) => theme.widget} !important;
        border: 1px solid ${({ theme }) => theme.widgetBorder} !important;
    }

    .card .card-header .header-search-input,
    .query-sorting {
        background-color: ${({ theme }) => theme.cardBody} !important;
        border: 1px solid ${({ theme }) => theme.widgetBorder} !important;
    }

    .react-bs-table-container .react-bs-table {
        background-color: ${({ theme }) => theme.cardBody} !important;
    }

    .dashboard-screen .card.grey .card-body,
    .blacklist-screen .card.grey .card-body,
    .analytics-screen .card.grey .card-body{
        background-color: ${({ theme }) => theme.widget} !important;
        // border: 1px solid ${({ theme }) => theme.cardBody} !important;
    }

    .dashboard-screen .card.grey .card-body h3,
    .analytics-screen .card.grey .card-body h3 {
        color: ${({ theme }) => theme.text} !important;
    }

    .card.grey .card-body {
        background: ${({ theme }) => theme.cardBody} !important;
    }

    .admin-container .app-header .dropdown-item {
        background: ${({ theme }) => theme.dropdownColor} !important;
    }

    .app-header .navbar-nav .dropdown-menu:after {
        border-bottom: 10px solid ${({ theme }) => theme.dropdownColor} !important;
    }

    .card-body {
        background: ${({ theme }) => theme.cardBody} !important;
    }

    .admin-container .logo-background {
        background-color: ${({ theme }) => theme.cardBody} !important;
    }

    .shop-product-screen .product-card {
        background-color: ${({ theme }) => theme.cardBody} !important;
    }

    .shop-product-screen .card.grey .card-body {
        background: ${({ theme }) => theme.body} !important;
        background-color: ${({ theme }) => theme.body} !important;
    }

    .detail-product-screen .card {
        background-color: ${({ theme }) => theme.cardBody} !important;
    }
    
    .modal-dialog .modal-content .modal-header,
    .modal-dialog .modal-content {
        background-color: ${({ theme }) => theme.cardBody} !important;
    }
`