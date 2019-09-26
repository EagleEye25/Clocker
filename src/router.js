import Vue from 'vue'
import Router from 'vue-router'
import addEmployee from '@/components/add-Employee.vue';
import addCard from '@/components/add-Card.vue';
import addReason from '@/components/add-Reason.vue';
import viewEmployee from '@/components/view-Employee.vue';
import assignCardProcess from '@/components/assign-card-process/assign-CardProcess.vue';
import selectCardForEmployee from '@/components/assign-card-process/select-CardForEmployee.vue';
import management from '@/components/management.vue';
import viewReasons from '@/components/view-Reasons.vue';
import addCalender from '@/components/add-Calender.vue';
import addCalenderTimes from '@/components/add-CalenderTimes.vue';
import viewCalender from '@/components/view-Calender.vue';
import viewCalenderTimes from '@/components/view-CalenderTimes.vue';
import assignCalenderTimes from '@/components/assign-CalenderTimes.vue';
import assignCalender from '@/components/assign-Calender.vue'
import generateEmpReports from '@/components/generate-EmpReports.vue';
import loginManagement from '@/components/login-Management.vue';
import unassignCalFromEmp from '@/components/unassign-CalFromEmp.vue';
import install from '@/components/install.vue';
import unassignTimesFromCal from '@/components/unassign-TimesFromCal.vue';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: install
    },
    {
      path: '/login',
      component: loginManagement
    },
    {
      path: '/management',
      component: management,
      children: [
        {
          path: 'addEmployee',
          component: addEmployee
        },
        {
          path: 'addCard',
          component: addCard
        },
        {
          path: 'addReason',
          component: addReason
        },
        {
          path: 'viewEmployee',
          component: viewEmployee
        },
        {
          path: 'assignCardProcess',
          component: assignCardProcess
        },
        {
          path: 'selectCardForEmployee',
          component: selectCardForEmployee
        },
        {
          path: 'viewReasons',
          component: viewReasons
        },
        {
          path: 'addCalendar',
          component: addCalender
        },
        {
          path: 'addCalendarTimes',
          component: addCalenderTimes
        },
        {
          path: 'viewCalendar',
          component: viewCalender
        },
        {
          path: 'viewCalendarTimes',
          component: viewCalenderTimes
        },
        {
          path: 'assignCalendarTimes',
          component: assignCalenderTimes
        },
        {
          path: 'assignCalendar',
          component: assignCalender
        },
        {
          path: 'employeeReports',
          component: generateEmpReports
        },
        {
          path: 'unassignCalFromEmp',
          component: unassignCalFromEmp
        },
        {
          path: 'unassignTimesFromCal',
          component: unassignTimesFromCal
        },
      ]
    }
  ]
});

const doLogIn = () => {
  const authToken = window.sessionStorage.getItem('token') || '';
  let isFail = true;
  try {
    const content = JSON.parse(atob(authToken.toString().split('.')[1] || ''));
    if (content && content.exp) {
      const now = Date.now();
      if (+now > +content.exp) {
        isFail = false;
      }
    }
  } catch(err) {
    // take no action
  }
  return isFail;
};

const doSetServer = () => {
  const serverAddy = window.localStorage.getItem('serverAddy') || '';
  return !serverAddy;
};

router.beforeEach((to, from, next) => {
  const setServer = doSetServer(to.path);
  const logIn = doLogIn(to.path);

  if (setServer) {
    if (to.path !== '/') {
      next('/');
    }
  } else if (!setServer && logIn) {
    if (to.path !== '/login') {
      next('/login');
    }
  }
  next();
});

export default router;