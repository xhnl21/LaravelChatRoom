import { createRouter, createWebHistory } from '@ionic/vue-router';
import form from './form';
import inbox from './inbox';
import room from './room';
// el orden de las paginas es importante ya que debe iniciar primero por la de "tutorial"
const importRouter = [
    form, inbox, room,
];
const routes: any[] = [];

function allRoutersX(data: any[]) {
    for (const j in data) {
        const rt = data[j];
        for (const i in rt) {
            routes.push(rt[i]);
        }
    }
}
allRoutersX(importRouter);

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
