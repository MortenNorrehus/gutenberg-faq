<section class="faq-wrapper noSpaceBefore">

    <?php
    $faqschema = '';
    foreach ($attributes['content'] as $key => $content) {
        $faqschema .= '{ "@type": "Question",
	"name": "' . $content['headline'] . '",
	"acceptedAnswer": {
	  "@type": "Answer",
	  "text": "<p>' . $content['content'] . '</p>"
	}
}';
        if ($key !== array_key_last($attributes['content'])) {
            $faqschema .= ',';
        }
    }

    echo '
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [' . $faqschema . ']
}
</script>';
    ?>
    <h2 class="extraSpaceAfter"><?= $attributes['headline'] ?></h2>
    <?php
    foreach ($attributes['content'] as $content) { ?>
        <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <h4 itemprop="name"> <?= $content['headline'] ?></h4>
            <div class="panel" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                <p itemprop="text"> <?= $content['content'] ?> </p>
            </div>
        </div>
    <?php } ?>
</section>

<script>
    document.addEventListener("DOMContentLoaded", (event) => {
        const faqs = document.querySelectorAll('.faq-item');

        faqs.forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('active')

                const panel = item.querySelector('.panel');
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            })
        })

    });
</script>