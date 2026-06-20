import DataTable from 'datatables.net-react';
import DT from 'datatables.net-bs5';

import 'datatables.net-bs5/css/dataTables.bootstrap5.css';

import 'datatables.net-responsive-bs5';
import 'datatables.net-responsive-bs5/css/responsive.bootstrap5.css';

import 'datatables.net-select-bs5';
import 'datatables.net-select-bs5/css/select.bootstrap5.css';

const registerDataTable = DataTable.use.bind(DataTable);

registerDataTable(DT);

export { DT };
export default DataTable;
