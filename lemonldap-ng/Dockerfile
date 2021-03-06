# Start from Debian Stretch
FROM debian:stretch

LABEL name="llng-apache2" \
      version="v0.0.1"

# Change SSO DOMAIN here
ENV SSODOMAIN=example.com \
    DUMBINITVERSION=1.2.0 \
    DEBIAN_FRONTEND=noninteractive

EXPOSE 80 443

COPY lemonldap-ng.list docker-entrypoint.sh /

# Update system
RUN apt-get -y update \
    && apt-get -y install wget apt-transport-https gnupg liblasso-perl \
    && apt-get -y dist-upgrade  \
    && echo "# Install Dumb-init" \
    && wget https://github.com/Yelp/dumb-init/releases/download/v${DUMBINITVERSION}/dumb-init_${DUMBINITVERSION}_amd64.deb \
    && dpkg -i dumb-init_${DUMBINITVERSION}_amd64.deb \
    && apt-get install -f -y \
    && echo "# Install LemonLDAP::NG repo" \
    && mv lemonldap-ng.list /etc/apt/sources.list.d/ \
    && wget -O - https://lemonldap-ng.org/_media/rpm-gpg-key-ow2 | apt-key add - \
    && apt-get -y update \
    && echo "# Install LemonLDAP::NG package" \
    && apt-get -y install apache2 libapache2-mod-perl2 libapache2-mod-fcgid lemonldap-ng lemonldap-ng-fr-doc \
    && echo "# Change SSO Domain" \
    && sed -i "s/example\.com/${SSODOMAIN}/g" /etc/lemonldap-ng/* /var/lib/lemonldap-ng/conf/lmConf-1.js /var/lib/lemonldap-ng/test/index.pl \
    && echo "# Enable sites" \
    && a2ensite handler-apache2.conf \
    && a2ensite portal-apache2.conf \
    && a2ensite manager-apache2.conf \
    && a2ensite test-apache2.conf \
    && a2dismod mpm_event \
    && a2enmod fcgid perl alias rewrite headers mpm_prefork \
    && echo "# Remove cached configuration" \
    && rm -rf /tmp/lemonldap-ng-config \
    && rm -fr /var/lib/apt/lists/* \
    && mkdir /vhosts

VOLUME /var/lib/lemonldap-ng/conf

ENTRYPOINT ["dumb-init","--","/docker-entrypoint.sh"]
CMD "/usr/sbin/apache2ctl" "-D" "FOREGROUND"
