import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Revelado Cultural — Flujos principales, Responsive y Accesibilidad WCAG 2.2 AA', () => {
  test('1. Desktop (1440x900): Inicio, 8 iniciativas, ausencia de pódcast pendientes, galería y accesibilidad Axe', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    // Hero principal
    await expect(
      page.getByRole('heading', {
        name: /LA CULTURA DEL BARRIO, AL DESCUBIERTO/i,
      })
    ).toBeVisible();

    // Catálogo de las 8 iniciativas
    const officialNames = [
      '3er Festival Artes del Movimiento Arché',
      'No entres Ahí',
      'Ferales',
      'Reflejos de Corporación H3',
      'Tres Tristes Tigres',
      'Pensar, narrar y habitar el territorio',
      'Narrar la realidad desde las viñetas: Un intercambio',
      'Se busca una Raíz',
    ];
    for (const name of officialNames) {
      await expect(page.getByText(name).first()).toBeVisible();
    }

    // No debe aparecer la sección "Voces del territorio" cuando no hay audios publicados
    await expect(
      page.getByRole('heading', { name: 'Voces del territorio' })
    ).toHaveCount(0);

    // Sin desbordamiento horizontal
    const overflowDesktop = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    expect(overflowDesktop).toBe(false);

    // Captura de pantalla Desktop Home
    await page.screenshot({
      path: '/tmp/revelado2-desktop-home.png',
      fullPage: false,
    });

    // Auditoría WCAG 2.2 AA en Home
    const homeAxe = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(homeAxe.violations).toEqual([]);
  });

  test('2. Exploración (/explorar): Búsqueda inmediata, filtros por disciplina, estado vacío y preservación de regreso', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 850 });
    await page.goto('/explorar');

    await expect(page.getByText(/MOSTRANDO 8 DE 8 INICIATIVAS/i)).toBeVisible();

    // Búsqueda por responsable ("Margarita Ortiz")
    const searchInput = page.getByRole('searchbox');
    await searchInput.fill('Margarita Ortiz');
    await expect(page.getByText(/MOSTRANDO 1 DE 8 INICIATIVA/i)).toBeVisible();
    await expect(
      page.getByRole('heading', {
        name: 'Pensar, narrar y habitar el territorio',
      })
    ).toBeVisible();

    // Estado vacío y limpiar filtros
    await searchInput.fill('iniciativa inexistente xyz');
    await expect(
      page.getByRole('heading', {
        name: /No encontramos iniciativas con ese criterio/i,
      })
    ).toBeVisible();
    await page.getByRole('button', { name: /Limpiar filtros/i }).first().click();
    await expect(page.getByText(/MOSTRANDO 8 DE 8 INICIATIVAS/i)).toBeVisible();

    // Filtrar por disciplina "Música" -> entrar a Ferales -> Volver a explorar conserva filtro
    await page.getByRole('button', { name: /Música/i }).click();
    await expect(page.getByText(/MOSTRANDO 1 DE 8 INICIATIVA/i)).toBeVisible();

    await page.getByRole('link', { name: /03 de 08: Ferales/i }).click();
    await expect(page).toHaveURL('/proyectos/ferales');
    await expect(
      page.getByRole('heading', { name: 'Ferales', level: 1 })
    ).toBeVisible();
    await page.waitForTimeout(450);

    await page.screenshot({
      path: '/tmp/revelado2-desktop-detail.png',
      fullPage: false,
    });

    // Probar Lightbox en ficha de Ferales
    await page
      .getByRole('button', { name: /Abrir en pantalla completa/i })
      .click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();

    // Auditoría WCAG 2.2 AA en Ficha de Proyecto
    const detailAxe = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(detailAxe.violations).toEqual([]);

    // Volver al catálogo conservando el filtro "?categoria=Música"
    await page.getByRole('link', { name: /Volver a explorar/i }).click();
    await expect(page).toHaveURL(/\/explorar\?categoria=M%C3%BAsica/);
    await expect(page.getByText(/MOSTRANDO 1 DE 8 INICIATIVA/i)).toBeVisible();
  });

  test('3. Mobile (375x812): Navegación inferior, layout sin scroll horizontal, video real y accesibilidad', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    const mobileNav = page.getByRole('navigation', {
      name: /Navegación móvil inferior/i,
    });
    await expect(mobileNav).toBeVisible();

    const overflowMobileHome = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    expect(overflowMobileHome).toBe(false);

    await page.screenshot({
      path: '/tmp/revelado2-mobile-home.png',
      fullPage: false,
    });

    // Navegar a Explorar desde barra inferior móvil
    await mobileNav.getByRole('link', { name: 'Explorar' }).click();
    await expect(page).toHaveURL('/explorar');
    await expect(
      page.getByRole('heading', { name: /Encuentra lo que te mueve/i })
    ).toBeVisible();
    await page.screenshot({
      path: '/tmp/revelado2-mobile-explore.png',
      fullPage: false,
    });

    // Navegar a Revelado Cultural desde barra inferior móvil
    await mobileNav.getByRole('link', { name: /Revelado Cultural/i }).click();
    await expect(page).toHaveURL(/\/revelado-cultural|\/acerca-de/);

    const aboutAxe = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(aboutAxe.violations).toEqual([]);

    // Verificar ficha con video HTML5 real (No entres Ahí)
    await page.goto('/proyectos/no-entres-ahi');
    await expect(page.locator('video')).toBeVisible();
    const overflowMobileDetail = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    expect(overflowMobileDetail).toBe(false);
  });
});
