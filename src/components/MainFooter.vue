<script setup lang="ts"></script>

<template>
  <div class="footer__container">
    <ul class="list-reset footer__social">
      <li>
        <a href="#" class="btn-icons-social-fill" aria-label="Социальная сеть Вконтакте">
          <svg viewBox="0 0 36 36" width="36" height="36">
            <use href="@/assets/img/icons/sprite.svg#social-vk"></use>
          </svg>
        </a>
      </li>
      <li>
        <a href="#" class="btn-icons-social-fill" aria-label="Видеосервис YouTube">
          <svg viewBox="0 0 36 36" width="36" height="36">
            <use href="@/assets/img/icons/sprite.svg#social-youtube"></use>
          </svg>
        </a>
      </li>
      <li>
        <a href="#" class="btn-icons-social-fill" aria-label="Социальная сеть Одноклассники">
          <svg viewBox="0 0 36 36" width="36" height="36">
            <use href="@/assets/img/icons/sprite.svg#social-ok"></use>
          </svg>
        </a>
      </li>
      <li>
        <a
          href="https://t.me/justdar"
          class="btn-icons-social-fill"
          aria-label="Мессенджер Телеграм"
        >
          <svg viewBox="0 0 36 36" width="36" height="36">
            <use href="@/assets/img/icons/sprite.svg#social-telegram"></use>
          </svg>
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.footer__container {
  padding-top: 40px;
  padding-bottom: 40px;
}

.footer__social {
  display: flex;
  justify-content: end;
  gap: 24px;
}

@media (max-width: 768px) {
  .footer__container {
    padding-top: 24px;
    padding-bottom: 36px;
  }

  .footer__social {
    padding: 0 20px;
    justify-content: start;
  }
}
</style>
