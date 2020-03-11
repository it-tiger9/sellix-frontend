import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    h1, h2, h3, h4, h5, p, label, span, a, th, td, input, select {
        color: ${({ theme }) => theme.text} !important;
    }
    .admin-container {
        background: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text};
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

    .admin-container .breadcrumb {
        background: ${({ theme }) => theme.cardBody};
    }

    .searchbar .header-search-input,
    table tbody td .badge-normal,
    .Select-control,
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

    

    .react-bootstrap-daterangepicker-container button {
        background-color: ${({ theme }) => theme.widget} !important;
    }

    select,
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

    .dashboard-screen .card.grey .card-body h2 {
        color: ${({ theme }) => theme.text} !important;
    }

    .card.grey .card-body {
        background: ${({ theme }) => theme.cardBody} !important;
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