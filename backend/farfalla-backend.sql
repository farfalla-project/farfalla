-- phpMyAdmin SQL Dump
-- version 2.8.0.2
-- http://www.phpmyadmin.net
-- 
-- Host: localhost
-- Generato il: 07 Mag, 2011 at 12:51 PM
-- Versione MySQL: 5.0.41
-- Versione PHP: 5.2.5
-- 
-- Database: `farfalla-backend`
-- 

-- --------------------------------------------------------

-- 
-- Struttura della tabella `alttexts`
-- 

CREATE TABLE `alttexts` (
  `id` int(10) NOT NULL auto_increment,
  `url` varchar(256) NOT NULL,
  `text` varchar(512) NOT NULL,
  `language_id` int(10) NOT NULL,
  `xpath` varchar(256) NOT NULL,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

-- 
-- Dump dei dati per la tabella `alttexts`
-- 

INSERT INTO `alttexts` (`id`, `url`, `text`, `language_id`, `xpath`, `created`, `modified`) VALUES (1, 'http://localhost/images/computer.html', 'A desktop computer', 1, 'asd', '2011-03-30 18:08:54', '2011-03-30 18:08:54');

-- --------------------------------------------------------

-- 
-- Struttura della tabella `languages`
-- 

CREATE TABLE `languages` (
  `id` int(10) NOT NULL auto_increment,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

-- 
-- Dump dei dati per la tabella `languages`
-- 

INSERT INTO `languages` (`id`, `name`) VALUES (1, 'English'),
(2, 'Italian');

-- --------------------------------------------------------

-- 
-- Struttura della tabella `plugins`
-- 

CREATE TABLE `plugins` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `name_2` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=latin1 COMMENT='User profiles' AUTO_INCREMENT=15 ;

-- 
-- Dump dei dati per la tabella `plugins`
-- 

INSERT INTO `plugins` (`id`, `name`, `description`, `created`, `modified`) VALUES (1, 'magnifier', 'This plugin allows text magnification. In order to use it, you require good mouse control and the possibility to access the keyboard. When you move the mouse over an element in a web page, you will see a red line around it. The magnified text appears on the right, but the magnification area can be moved by pressing the <strong>left</strong> and <strong>right</strong> arrows.', '2010-08-09 13:50:29', '2010-08-09 14:01:50'),
(2, 'keyboard', 'This plugin displays a virtual keyboard each time the user clicks on a text field.', '2010-08-09 13:52:21', '2010-08-09 13:52:21'),
(3, 'text-to-speech', 'Reads the text of a web page for you.', '2010-08-09 14:00:05', '2010-08-30 01:11:09'),
(4, 'fontsize', 'Gradually adjust the font size of an entire page to match your preferences.', '2010-08-30 01:10:46', '2010-08-30 01:10:46'),
(5, 'negative', 'Provides a switch which converts all colors in a page to their negatives, thus changing the contrast and improving readability.', '2010-08-31 00:40:17', '2010-08-31 01:16:22'),
(6, 'hicontrast', 'Switch to high-contrast style, with black background, white text and colored links. Improves readability of some pages with poor contrast.', '2010-08-31 01:27:09', '2010-08-31 01:27:09'),
(7, 'addalt', 'Scans pages looking for IMG elements and allows adding an "alt" text to them. Users with the UserAlt plugin enabled will be able to "view" this alternate text.', '2010-09-06 19:03:03', '2010-09-06 19:03:03'),
(8, 'axsjax', 'AxsJAX is a library allowing automatic correction of common errors in web pages and enhancing compliance with W3C ARIA6. Those errors could cause problems to assistive software users, hence AxsJAX acts as a facilitator for them. The AxsJAX library was developed at Google Inc. by C. L. Chen and T. V. Raman; it is released with an open source licence. The project is documented at http://code.google.com/p/google- axsjax/', '2010-11-24 14:47:21', '2010-11-24 14:47:21'),
(9, 'bigcursor', 'Changes the mouse pointer shape and size to a larger one, with higher contrast.', '2011-01-01 23:27:45', '2011-01-01 23:27:45'),
(10, 'fivekeys', 'Move between elements using only five keys!', '2011-01-14 22:19:19', '2011-01-14 22:19:19'),
(11, 'step-by-step', 'Allows moving through the elements of a webpage using the arrow keys. Left and right arrows move from a DOM element to the following or to the preceding one. ', '2011-01-20 01:09:11', '2011-01-20 01:09:11'),
(12, 'selection', 'Get selected text and prepare it for other plugins...', '2011-01-28 20:14:59', '2011-01-28 20:14:59'),
(13, 'jplayer', 'An audio player, useful for text to speech.', '2011-01-28 20:24:37', '2011-01-28 20:24:37'),
(14, 'dasher', 'Includes a Java applet from the Dasher project.  See http://www.inference.phy.cam.ac.uk/dasher/ for info about what is Dasher and how it works.', '2011-03-12 10:31:04', '2011-03-12 10:31:04');

-- --------------------------------------------------------

-- 
-- Struttura della tabella `profiles`
-- 

CREATE TABLE `profiles` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(100) NOT NULL default '',
  `password` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=latin1 COMMENT='User profiles' AUTO_INCREMENT=20 ;

-- 
-- Dump dei dati per la tabella `profiles`
-- 

INSERT INTO `profiles` (`id`, `name`, `password`, `description`, `created`, `modified`) VALUES (1, 'Mouse Only', 'farfalla', 'This is a profile dedicated to people who can use a mouse (or another pointing and clicking device) but can''t use a keyboard at all. It includes only the "keyboard" plugin.', '2010-08-09 13:54:40', '2010-08-30 01:08:34'),
(2, 'Selective Magnification', 'farfalla', 'This profile is meant to improve the user experience for people with low vision. It includes only the "magnifier" plugin. In order to use it, you require good mouse control and the possibility to access the keyboard.', '2010-08-09 13:57:41', '2010-08-30 01:09:10'),
(5, 'Low Vision', 'farfalla', 'For people who have trouble in understanding text due to its size or to poor contrast. This profile includes the "fontsize" and "contrast" plugins.', '2010-08-30 01:13:45', '2010-08-30 01:13:57'),
(6, 'Testing', 'testing', 'Profile for testing purposes only...', '2010-09-06 19:03:30', '2011-03-22 09:19:11'),
(8, 'Mouse improvements', 'farfalla', 'Adds some visual improvements to the mouse pointer.', '2011-01-01 23:29:45', '2011-03-22 01:19:01'),
(17, 'Testing addalt', '', 'Profile for testing purposes only...', '2011-03-23 18:31:21', '2011-03-23 18:31:21'),
(18, 'Read selected text', 'farfalla', '', '2011-03-29 09:28:40', '2011-03-29 09:28:40'),
(19, 'Read highlighted element', 'farfalla', '', '2011-03-29 09:29:45', '2011-03-29 09:29:45');

-- --------------------------------------------------------

-- 
-- Struttura della tabella `profiles_plugins`
-- 

CREATE TABLE `profiles_plugins` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `profile_id` int(10) unsigned NOT NULL,
  `plugin_id` int(10) unsigned NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=68 DEFAULT CHARSET=latin1 COMMENT='Join table linking profiles with associated plugins' AUTO_INCREMENT=68 ;

-- 
-- Dump dei dati per la tabella `profiles_plugins`
-- 

INSERT INTO `profiles_plugins` (`id`, `profile_id`, `plugin_id`) VALUES (64, 18, 13),
(11, 2, 1),
(10, 1, 2),
(14, 5, 6),
(12, 5, 4),
(63, 18, 12),
(47, 8, 9),
(62, 18, 3),
(61, 17, 7),
(67, 19, 13),
(66, 19, 11),
(65, 19, 3),
(56, 6, 14);

-- --------------------------------------------------------

-- 
-- Struttura della tabella `users`
-- 

CREATE TABLE `users` (
  `id` int(11) NOT NULL auto_increment,
  `username` char(50) default NULL,
  `password` char(40) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

-- 
-- Dump dei dati per la tabella `users`
-- 

INSERT INTO `users` (`id`, `username`, `password`) VALUES (3, 'mangia', '95b04cb2e168555ff2c8ceaf3260c2e777ea033f'),
(7, 'pippo', 'b048647663ab37906fd3c4028c1ab63c225cdd5f');
