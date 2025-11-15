export function initNavbar(){
    document.addEventListener('DOMContentLoaded', () => {
        const root = document.querySelector('[data-nav-root]') as HTMLElement | null;
        const indicator = document.querySelector('[data-nav-indicator]') as HTMLElement | null;
        const items = Array.from(document.querySelectorAll('[data-nav-item]')) as HTMLElement[];

        if(!root || !indicator || items.length === 0) return;

        const updateIndicator = (target: HTMLElement) =>{
            const rootRect = root.getBoundingClientRect();
            const rect = target.getBoundingClientRect();

            const left = rect.left - rootRect.left;
            const width = rect.width;

            indicator.style.left = `${left-2}px`;
            indicator.style.width = `${width}px`;
        };

        updateIndicator(items[0]);

        items.forEach((item) => {
            item.addEventListener('click', (event) => {
                const target = event.currentTarget as HTMLElement;

                items.forEach((it) => it.setAttribute('data-active', 'false'));
                target.setAttribute('data-active', 'true');
                updateIndicator(target);
                
                const href = target.getAttribute('href');
                if(href?.startsWith('#')){
                    event.preventDefault();
                    const section = document.querySelector(href);
                    section?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    })
                }
            })
        })
    })
}