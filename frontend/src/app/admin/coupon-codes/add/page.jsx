// File: C:\Users\hanos\nextall\frontend\src\app\admin\coupon-codes\add\page.jsx
import React from 'react';

import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';
import AddCouponCode from 'src/components/_admin/couponCodes/addCouponCode';
export default function page() {
  return (
    <div>
      <HeaderBreadcrumbs
        admin
        heading="Coupon Code List"
        links={[
          {
            name: 'Dashboard',
            href: '/admin'
          },
          {
            name: 'Coupon code',
            href: '/admin/coupon-code'
          },
          {
            name: 'Add coupon code'
          }
        ]}
      />
      <AddCouponCode />
    </div>
  );
}
