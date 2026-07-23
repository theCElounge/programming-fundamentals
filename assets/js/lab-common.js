/* ==========================================================================
   LAB-COMMON SCRIPT — Programming Fundamentals
   Shared by every lab page. Provides:
   1. Copy-to-clipboard buttons on code blocks
   2. Light visual affordance on quiz/notes textareas
   3. "On this page" scroll-spy active state
   Image placeholders need no script: an <img> with an empty src
   (src="") is styled directly by lab-common.css, and its alt text
   is still announced by screen readers whether or not an image
   file is ever loaded.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

    // ------------------------------------------------------------
    // 1. COPY CODE BUTTONS
    // ------------------------------------------------------------
    const codeBlocks = document.querySelectorAll('.code-block');

    codeBlocks.forEach(function (block) {
        const pre = block.querySelector('pre');
        if (!pre) return;

        const copyBtn = document.createElement('button');
        copyBtn.type = 'button';
        copyBtn.className = 'copy-btn';
        copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
        copyBtn.textContent = 'Copy';

        copyBtn.addEventListener('click', function () {
            const code = pre.textContent;

            function showCopied() {
                copyBtn.textContent = 'Copied!';
                copyBtn.setAttribute('aria-label', 'Code copied to clipboard');
                setTimeout(function () {
                    copyBtn.textContent = 'Copy';
                    copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
                }, 2000);
            }

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(code).then(showCopied).catch(function () {
                    fallbackCopy(code, showCopied);
                });
            } else {
                fallbackCopy(code, showCopied);
            }
        });

        block.appendChild(copyBtn);
    });

    function fallbackCopy(text, onDone) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            onDone();
        } catch (e) {
            console.error('Failed to copy code:', e);
        }
        document.body.removeChild(textarea);
    }

    // ------------------------------------------------------------
    // 2. QUIZ / NOTES TEXTAREA AFFORDANCE
    // ------------------------------------------------------------
    document.querySelectorAll('.quiz-textarea').forEach(function (textarea) {
        textarea.addEventListener('input', function () {
            textarea.style.borderColor = textarea.value.trim().length > 0
                ? 'var(--primary-color)'
                : 'var(--border-strong)';
        });
    });

    // ------------------------------------------------------------
    // 3. TABLE OF CONTENTS ACTIVE STATE
    // ------------------------------------------------------------
    const tocLinks = document.querySelectorAll('.toc a');
    const sections = document.querySelectorAll('.section[id]');

    function updateTocActive() {
        let currentSection = '';
        sections.forEach(function (section) {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });
        tocLinks.forEach(function (link) {
            link.removeAttribute('aria-current');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.setAttribute('aria-current', 'true');
            }
        });
    }

    window.addEventListener('scroll', updateTocActive, { passive: true });
    updateTocActive();
});
