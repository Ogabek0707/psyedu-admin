import { mdiChartBar, mdiShapePlusOutline , mdiMapMarkerPlus, mdiTextBoxCheckOutline, mdiFormatListText } from '@mdi/js'
export const AdminMenu = [
      {
            path: '/statistics',
            label: "Statistikalar",
            name: "statistics",
            icon: mdiChartBar
      },
      {
            path: '/results',
            label: 'Natijalar',
            name: 'results',
            icon: mdiTextBoxCheckOutline,
            children: [
                {
                    path: "/result/result-starter",
                    label: "Boshlang'ich test natijalari",
                    name: "result-starter"
                },
                {
                    path: "/result/result-lesson",
                    label: "Darsdagi test natijalari",
                    name: "result-lesson"
                },
                {
                    path: "/result/result-finish",
                    label: "Yakuniy test natijalari",
                    name: "result-finish"
                },
                {
                    path: "/result/result-categories",
                    label: "Kategoriy test natijalari",
                    name: "result-categories"
                }
            ]
      },
      {
            path: '/category',
            label: "Kategoriyalar",
            name: "category",
            icon: mdiShapePlusOutline
      },
      {
            path: '/tests',
            label: 'Testlar',
            name: 'tests',
            icon: mdiFormatListText,
            children: [
                {
                    path: "/result/result-starter",
                    label: "Boshlang'ich test natijalari",
                    name: "result-starter"
                },
                {
                    path: "/result/result-lesson",
                    label: "Darsdagi test natijalari",
                    name: "result-lesson"
                },
                {
                    path: "/result/result-finish",
                    label: "Yakuniy test natijalari",
                    name: "result-finish"
                },
                {
                    path: "/result/result-categories",
                    label: "Kategoriy test natijalari",
                    name: "result-categories"
                }
            ]
      },
      {
            path: '/region',
            label: "Viloyatlar",
            name: "region",
            icon: mdiMapMarkerPlus
      },
      
]