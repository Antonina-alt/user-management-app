const plural = (count, one, many) => (count === 1 ? one : many);

const block = (count) => plural(
  count,
  'User was blocked successfully.',
  `${count} users were blocked successfully.`
);

const unblock = (count) => plural(
  count,
  'User was unblocked successfully.',
  `${count} users were unblocked successfully.`
);

const deleteUsers = (count) => plural(
  count,
  'User was deleted successfully.',
  `${count} users were deleted successfully.`
);

const deleteUnverified = (count) => {
  return count === 0
    ? 'There are no unverified users to delete.'
    : `${count} unverified users were deleted successfully.`;
};

module.exports = {
  block,
  unblock,
  delete: deleteUsers,
  deleteUnverified,
};
