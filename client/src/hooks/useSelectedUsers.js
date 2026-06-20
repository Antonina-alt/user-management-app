import { useCallback, useState } from 'react';
import { getSelectedRowIds } from '../utils/userTableUtils.js';

export const useSelectedUsers = (tableRef) => {
    const [selectedIds, setSelectedIds] = useState([]);

    const syncSelectedIds = useCallback(() => {
        const table = tableRef.current?.dt();

        setSelectedIds(table ? getSelectedRowIds(table) : []);
    }, [tableRef]);

    const clearSelection = useCallback(() => {
        tableRef.current?.dt()?.rows().deselect();
        setSelectedIds([]);
    }, [tableRef]);

    return { selectedIds, syncSelectedIds, clearSelection };
};
