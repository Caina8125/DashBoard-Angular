import { MatPaginatorIntl } from '@angular/material/paginator';

export function getPortuguesePaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Items por página:';

  return paginatorIntl;
}
