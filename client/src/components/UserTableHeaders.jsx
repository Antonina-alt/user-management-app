import { USER_TABLE_HEADERS } from '../constants/userTable.js';

const UserTableHeaders = () => {
    return (
        <thead>
            <tr>
                {USER_TABLE_HEADERS.map((header) => <th key={header || 'select'}>{header}</th>)}
            </tr>
        </thead>
    );
};

export default UserTableHeaders;
